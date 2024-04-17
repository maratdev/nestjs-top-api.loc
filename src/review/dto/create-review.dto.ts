import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  description: string;

  @Max(5)
  @Min(1, {
    message: 'Рейтинг не может быть меньше 1 ',
  })
  @IsNumber()
  rating: number;
  @IsOptional()
  @IsMongoId()
  productId: Types.ObjectId;
}
