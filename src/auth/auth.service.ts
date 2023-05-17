import { CreateUserDto } from "./../user/dto/create-user.dto";
import { UserService } from "./../user/user.service";
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,  private configService: ConfigService,){}   

    async registration(userDto: CreateUserDto): Promise<any> {    
        const checkEmail = await this.userService.getUsersByEmail(userDto.email);      
        const checkTag = await this.userService.getUsersByTag(userDto.userTag)      

        if (checkEmail) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        if (checkTag) {
            throw new HttpException('Пользователь с таким tag существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const newUser = await this.userService.createUser({...userDto, password: hashPassword})         
        const tokens = await this.getTokens(newUser._id.toString() , newUser.email);
        await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);
        return {...tokens, userId: newUser._id}     
    }

    async login(userDto: CreateUserDto){
        const user = await this.userService.getUsersByEmail(userDto.email)         
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);        

        if (user && passwordEquals) {           
          const tokens = await this.getTokens(user._id.toString(), user.email)
          await this.updateRefreshToken(user._id.toString(), tokens.refreshToken)          
          return{ ...tokens, userId: user._id}         
        }         
        throw new HttpException('Некорректный емайл или пароль', HttpStatus.BAD_REQUEST);                  
    }     

    async refreshTokens(authHeader: string) {                  
      const refreshToken = authHeader.split(' ')[1]; // get the refresh token from the header
      const decoded = jwt.verify(refreshToken, this.configService.get<string>('JWT_REFRESH_SECRET'));    
      const sub = typeof decoded.sub === 'function' ? decoded.sub() : decoded.sub;
      const user = await this.userService.getById(sub);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException();
      }
    
      const tokens = await this.getTokens(user._id.toString(), user.email);
      await this.updateRefreshToken(user._id.toString(), tokens.refreshToken);    
      const userId = JSON.stringify(user._id).substring(1, JSON.stringify(user._id).length - 1);      
      return { ...tokens, userId}  
    }

    async updateRefreshToken(userId: string, refreshToken: string) {           
        await this.userService.update(userId, {refreshToken});
      }
    
    async getTokens(userId: string, email: string) {      
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync({sub: userId,email},
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '3600s',
            },
          ),
          this.jwtService.signAsync({sub: userId, email},
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '30d',
            },
          ),
        ]);
        return {
            accessToken,
            refreshToken,
          };
    }
}
