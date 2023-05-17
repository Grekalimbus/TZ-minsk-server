import { TodoDto } from "./dto/createTodo.dto";
import { Model, ObjectId } from "mongoose";
import { Todo, TodoDocument } from "./shemas/todo.shema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TodoService{
    constructor(@InjectModel(Todo.name) private goodDeedPostModel: Model<TodoDocument>) {}

    async create(todoDto:TodoDto): Promise<TodoDocument>{
        const todos = new this.goodDeedPostModel(todoDto)
        return todos.save()
    }    

    async getAllTodo(): Promise<TodoDocument[]>{
        const todos = await this.goodDeedPostModel.find()
        return todos
    }

    async update(todoId: string, todoDto: TodoDto): Promise<TodoDocument>{
        const todo = await this.goodDeedPostModel.findByIdAndUpdate(todoId,todoDto)
        return todo
    }       

    async delete(id: ObjectId): Promise<ObjectId>{
        const todos = await this.goodDeedPostModel.findByIdAndDelete(id)
        return todos.id
    }
    
}