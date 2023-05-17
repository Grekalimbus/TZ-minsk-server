import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { User, UserSchema } from "../user/shemas/user.shema";
import { Todo, TodoSchema } from "./shemas/todo.shema";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { forwardRef } from "@nestjs/common/utils";
import { AuthModule } from "src/auth/auth.module";


@Module({
    providers:[TodoService],
    controllers: [TodoController],
    exports:[TodoService],
    imports:[
        MongooseModule.forFeature( [{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature( [{ name: Todo.name, schema: TodoSchema }]),
        forwardRef(() => AuthModule),      
    ],           
})
export class TodoModule{}

