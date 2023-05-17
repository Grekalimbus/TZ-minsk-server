import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {  

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userId: mongoose.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Todo'})
  todoId: mongoose.Types.ObjectId;

  @Prop()
  date: string  

  @Prop()
  time: string

  @Prop()
  title: string;
 
}

export const CommentSchema = SchemaFactory.createForClass(Comment);