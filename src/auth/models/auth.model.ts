import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
  @Prop()
  _id: string;
  @Prop({
    unique: true,
  })
  email: string;
  @Prop()
  passwordHash: string;
  @Prop()
  createdAt?: Date;
  @Prop()
  updatedAt?: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
