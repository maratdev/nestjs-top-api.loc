import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
  @Prop()
  count: number;
  @Prop()
  juniorSalary: number;
  @Prop()
  middleSalary: number;
  @Prop()
  seniorSalary: number;
}

export class Advantages {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

@Schema({
  timestamps: true,
  collection: 'pages',
})
export class TopPageModel {
  @Prop({
    enum: TopLevelCategory,
  })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({
    unique: true,
  })
  alias: string;

  @Prop({
    type: () => [HhData],
  })
  hh?: HhData;

  @Prop({
    type: () => [Advantages],
  })
  advantages: Advantages[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({
    type: () => [String],
  })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel).index({
  '$**': 'text',
});
