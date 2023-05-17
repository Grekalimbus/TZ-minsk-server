import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import { UsersController } from "./user.controlles";
import { User, UserSchema } from "./shemas/user.shema";
import { forwardRef } from "@nestjs/common/utils";
import { AuthModule } from "src/auth/auth.module";


@Module({
    providers: [UserService], 
    controllers: [UsersController], 
    exports:[UserService],
    imports: [
      MongooseModule.forFeature( [{ name: User.name, schema: UserSchema }]), 
      forwardRef(() => AuthModule),
    ],        
   
  })
  export class UsersModule {}