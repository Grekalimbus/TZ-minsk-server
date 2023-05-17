import { CreateFriend } from "./dto/create-friend.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Friend, FriendDocument } from "./shemas/friend.shema";

@Injectable()
export class FriendService{
    constructor (@InjectModel(Friend.name) private friendModel: Model<FriendDocument>){}

    async createFriend(friendDto: CreateFriend): Promise<FriendDocument>{        
        const createdFriend = new this.friendModel(friendDto);
        return createdFriend.save();
    }

    async getAllFriend() : Promise<FriendDocument[]>{
        const friends = await this.friendModel.find()
        return friends
    }    
    
    async updateStatus(id: string, createFriend: CreateFriend ): Promise<FriendDocument>{              
        const updateFriend = await this.friendModel.findByIdAndUpdate(id, {...createFriend}, { new: true })           
        return  updateFriend.save()
    }

    async deleteFriend(id:string){
        await this.friendModel.findByIdAndDelete(id)
        return id
    }
}