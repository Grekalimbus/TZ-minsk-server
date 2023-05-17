import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

enum FriendStatus {
    Pending = 'PENDING',
    Accepted = 'ACCEPTED',
    Rejected = 'REJECTED',
  }

export type FriendDocument = HydratedDocument<Friend>;
@Schema()
export class Friend{

    @Prop()
    userFollower: string

    @Prop()
    userFollowing: string      

    @Prop()
    followerImage: string

    @Prop({ type: String, enum: FriendStatus, default: FriendStatus.Pending })
    status: FriendStatus;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);