import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
// описываем поля схемы
export class User {
  // Обозначаем что это свойства
  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;
  @Prop([String])
  images: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
