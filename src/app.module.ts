import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MealsModule } from './meals/meals.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, DrizzleModule, MealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
