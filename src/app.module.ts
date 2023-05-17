import { FriendModule } from "./friends/friend.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from "./todos/todo.module";
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { UsersModule } from "./user/user.module";
import { CommentModule } from "./comments/comment.module";

@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://grechkindanil322:danil322@cluster0.mlnvvgy.mongodb.net/good-post?retryWrites=true&w=majority'),  
        ConfigModule.forRoot({
            envFilePath: ".env",
          }),   
        TodoModule,
        UsersModule,
        AuthModule,
        FriendModule,
        CommentModule
    ],
    controllers:[],
    providers: []        
})
export class AppModule {}
    
  