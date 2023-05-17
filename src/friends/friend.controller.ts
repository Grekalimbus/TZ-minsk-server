import { Controller, Post, UseGuards, Get, Body, Param, Patch } from "@nestjs/common";
import { Delete } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateFriend } from "./dto/create-friend.dto";
import { FriendService } from "./friend.service";


@Controller('friends')
export class FriendController {

    constructor(private friendService: FriendService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() friendDto: CreateFriend ){
        return this.friendService.createFriend(friendDto)
    }     

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllFriend(){
        return this.friendService.getAllFriend()
    }     
   
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateStatus(@Param("id") id: string ,@Body() createFriend: CreateFriend){
        return this.friendService.updateStatus(id, createFriend)
    }  

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteFriend(@Param("id") id: string){
        return this.friendService.deleteFriend(id)
    }
} 


    
    
