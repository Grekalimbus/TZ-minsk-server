import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { Friend, FriendSchema } from "./shemas/friend.shema";
import { AuthModule } from "src/auth/auth.module";


@Module({
    providers:[FriendService],
    controllers:[FriendController],
    exports:[FriendService],  
    imports:[
        MongooseModule.forFeature( [{ name: Friend.name, schema: FriendSchema }]), 
        forwardRef(() => AuthModule),  
     ],        

})
export class FriendModule{

}