import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommentDto } from "./dto/create-comment.dto";
import { Comment, CommentDocument } from "./shemas/comment.shema";


@Injectable()
export class CommentService{
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async create (commentDto: CommentDto): Promise<CommentDocument>{
        const comment = new this.commentModel(commentDto)
        return comment.save()
    }

    async getAllComments(): Promise<CommentDocument[]>{
       const comments = await this.commentModel.find()
       return comments
    }

    async getByTodoId(todoId: string): Promise<CommentDocument[] | []>{
        const comments = await this.commentModel.find()
        const commentByTodoId = comments.filter(comment => comment.todoId.toString() === todoId)
        return commentByTodoId
    }    

    async delete(id: string): Promise<string>{
        await this.commentModel.findByIdAndDelete(id)
        return id
    }
}