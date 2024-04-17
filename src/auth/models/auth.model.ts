import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AuthModel>;

@Schema({
  collection: 'auth',
  timestamps: true,
})
export class AuthModel {
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

export const UserSchema = SchemaFactory.createForClass(AuthModel);
