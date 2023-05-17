import { AuthService } from "./auth.service";
import { CreateUserDto } from "./../user/dto/create-user.dto";
import { Body, Controller, Headers, Post} from "@nestjs/common";


@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){         
        return this.authService.registration(userDto)
    }    

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }    
    
    @Post('/refresh')
    refresh(@Headers('authorization') authHeader: string) {    
        return this.authService.refreshTokens(authHeader);    
    }    
}