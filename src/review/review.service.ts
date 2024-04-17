import { Injectable } from '@nestjs/common';
import { ReviewModel } from './models/review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { HydratedDocument, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create({
      ...dto,
      productId: new Types.ObjectId(dto.productId),
    });
  }

  async delete(id: string): Promise<HydratedDocument<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(
    productId: Types.ObjectId,
  ): Promise<HydratedDocument<ReviewModel>[]> {
    return this.reviewModel.find({ productId: productId }).exec();
  }
}
