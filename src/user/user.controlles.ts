import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('users')
export class UsersController {
    constructor (private userService: UserService){}
    
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }     
    
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }   
    
    @UseGuards(JwtAuthGuard)
    @Get(":email")
    getOne(@Param('email') email: string){
        return this.userService.getUsersByEmail(email)
    }  

    @UseGuards(JwtAuthGuard)
    @Get('id/:id')
    getById(@Param('id') id: string) {
    return this.userService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('tag/:tag')
    getUsersByTag(@Param('tag') tag: string) {
    return this.userService.getUsersByTag(tag);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    updateUser(@Param('id') id: string,@Body() userDto: CreateUserDto) {
    return this.userService.updateUser(id, userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
    return this.userService.remove(id);
    }
    
}





