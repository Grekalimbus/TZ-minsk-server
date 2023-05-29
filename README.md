# **Backend** 
## Getting Started
First, run the development server: *npm run dev* or *yarn dev*

    npm run start:dev
<br />

## [Click > Frontend repository](https://github.com/Grekalimbus/TZ-minsk-client) 

<br />  

### Used tehnolohy
A plus marked the technologies that I learned while working on the project

    + NestJS    
    + Docker
   
    TypeScript
    MongoDB
<br />  

## Code examples
<br />  

### Entitie logic

[src/user/user.module](https://github.com/Grekalimbus/TZ-minsk-server/blob/main/src/user/user.module.ts)
```js
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
```
<br/>

[src/user/user.controller](https://github.com/Grekalimbus/TZ-minsk-server/blob/main/src/user/user.controlles.ts)

```js
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
```
<br />

[src/user/user.service](https://github.com/Grekalimbus/TZ-minsk-server/blob/main/src/user/user.service.ts)
```js
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
```

