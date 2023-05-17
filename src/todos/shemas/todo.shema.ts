import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose'

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {  

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userId: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  ratingPoints: number;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);