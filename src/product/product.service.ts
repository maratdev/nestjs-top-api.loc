import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './models/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_NOT_FOUND } from './constants';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/models/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(product: CreateProductDto) {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findById(id: string): Promise<ProductModel> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async deleteById(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return product;
  }

  async updateById(id: string, product: CreateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }
    return updatedProduct;
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'review',
          },
        },
        {
          $addFields: {
            reviewsCount: {
              $size: '$review',
            },
            reviewAvg: {
              $avg: '$review.rating',
            },
            review: {
              $function: {
                body: 'function(review) { return review.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}',
                args: ['$review'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec()) as (ProductModel & {
      review: ReviewModel[];
      reviewsCount: number;
      reviewAvg: number;
    })[];
  }
}
