import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
// {autoIndex: false}
@Schema()
export class User {   

  @Prop({ unique: true })
  userTag: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'https://i.postimg.cc/25zkQS9c/user-2160923-1280.png' })
  image: string
  
  @Prop()
  refreshToken: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);