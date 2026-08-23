import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { DeviceInfoMiddleware } from './device-info.middleware';
import { SessionsModule } from '@sessions/sessions.module';


@Module({
  imports:[
    UsersModule, 
    SessionsModule,
    JwtModule.register({
      global:true, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports:[AuthService]
})
export class AuthModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(DeviceInfoMiddleware).forRoutes({
      path:'auth/login',
      method:RequestMethod.POST
    })
  }
}
