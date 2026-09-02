import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { DrizzleModule } from '@drizzle/drizzle.module';

@Module({
  controllers: [MealsController],
  providers: [MealsService],
  imports: [DrizzleModule]
})
export class MealsModule {}
