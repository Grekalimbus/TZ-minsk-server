
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User,UserDocument } from "./shemas/user.shema";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import {  UpdateUserDto } from "./dto/update-user.dto";



@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async createUser(userDto: CreateUserDto): Promise<UserDocument>{        
        const createdUser = new this.userModel(userDto);
        return createdUser.save();
    }

    async getAllUsers(): Promise<UserDocument[]>{
        return this.userModel.find().exec();
    }

    async getById(id: string): Promise<UserDocument> {
        return  this.userModel.findById(id).exec();
    }

    async getUsersByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email }).exec();
        return user
    }   

    async getUsersByTag(userTag: string): Promise<UserDocument> {
        return  this.userModel.findOne({ userTag }).exec();        
    } 

    async updateUser(id: string,userDto: CreateUserDto): Promise<UserDocument> {                
        return this.userModel.findByIdAndUpdate(id, userDto, {new: true}).exec()
    }

    async update(id: string,updateUserDto: UpdateUserDto): Promise<UserDocument> {                
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
   
}