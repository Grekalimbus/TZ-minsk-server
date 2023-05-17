import { UsersModule } from "./../user/user.module";
import { AuthController } from "./auth.controller";
import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./jwt-auth.guard";


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  imports: [
    forwardRef(() => UsersModule),   
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: async () => ({secret: process.env.JWT_ACCESS_SECRET || 'SECRET'}),
    }),   
    
  ]  
})
export class AuthModule {}
