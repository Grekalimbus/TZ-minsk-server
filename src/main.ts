import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async ()=>{
    try{        
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors({ 
            credentials: true, 
            origin: [ 
              'http://localhost:3000', 
              'http://localhost:3001', 
              "https://tz-minsk.vercel.app",                            
              'https://tz-minsk-ecs224ejf-grekalimbus.vercel.app/',               
              'https://tz-minsk-git-deploy-backend-grekalimbus.vercel.app', 
              'https://tz-minsk.vercel.app/friends/Friends', 
              'https://tz-minsk.vercel.app/createTodo/CreateTodo', 
              'https://tz-minsk.vercel.app/themas/Themas',               
            ], 
          });
        await app.listen(PORT, ()=> console.log(`Server started on port  = ${PORT}`))        
    }
    catch(e){
        console.log(e);        
    }
}
start()