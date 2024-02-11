import { Injectable } from '@nestjs/common';
import { ReviewModel } from './models/review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<HydratedDocument<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(
    productId: string,
  ): Promise<HydratedDocument<ReviewModel>[]> {
    console.log(productId);
    return this.reviewModel.find({ productId: productId }).exec();
  }
}
