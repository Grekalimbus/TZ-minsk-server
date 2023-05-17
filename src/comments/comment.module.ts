import { TodoSchema } from "./../todos/shemas/todo.shema";
import { forwardRef } from "@nestjs/common/utils";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./shemas/comment.shema";
import { AuthModule } from "src/auth/auth.module";
import { User, UserSchema } from "src/user/shemas/user.shema";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { Todo } from "src/todos/shemas/todo.shema";


@Module({
    providers:[CommentService],
    controllers: [CommentController],
    exports: [CommentService],
    imports:[
        MongooseModule.forFeature( [{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature( [{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature( [{ name: Todo.name, schema: TodoSchema }]),
        forwardRef(() => AuthModule), 
    ]
})
export class CommentModule{

}
