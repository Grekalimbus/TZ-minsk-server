import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TodoDto } from "./dto/createTodo.dto";
import { TodoService } from "./todo.service";
import { Controller, Get, Post, Delete, Body, Param, Patch } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { UseGuards } from "@nestjs/common/decorators";

@Controller('todo')
export class TodoController{    
    constructor (private todoService: TodoService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() todoDto: TodoDto){
        return this.todoService.create(todoDto)
    }    

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTodo(){
        return this.todoService.getAllTodo()
    }

    @Patch(':todoId')
    updateTodo(@Param("todoId") todoId: string, @Body() todoDto: TodoDto){
        return this.todoService.update(todoId, todoDto)
    }       

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: ObjectId){
        return this.todoService.delete(id)
    }

    
}