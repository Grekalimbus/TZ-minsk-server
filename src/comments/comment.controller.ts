import { CommentService } from "./comment.service";
import { Controller, Post, Body, Patch, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { CommentDto } from "./dto/create-comment.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('comments')
export class CommentController{
    constructor (private commentService: CommentService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() commentDto: CommentDto){
        return this.commentService.create(commentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllComments(){
        return this.commentService.getAllComments()
    }

    @UseGuards(JwtAuthGuard)
    @Get(":todoId")
    getByTodoId(@Param('todoId') todoId: string){
        return this.commentService.getByTodoId(todoId)
    }    

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param('id') id: string){
        return this.commentService.delete(id)
    }
}