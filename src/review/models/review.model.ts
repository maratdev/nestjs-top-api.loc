import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema({
  collection: 'reviews',
  timestamps: true,
})
export class ReviewModel {
  @Prop()
  name: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  rating: number;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt?: Date;
  @Prop()
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
