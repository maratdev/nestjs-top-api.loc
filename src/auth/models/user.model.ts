import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel {
  @Prop({
    unique: true,
  })
  email: string;
  @Prop()
  password: string;
  @Prop()
  createdAt?: Date;
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
