import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chef Orchestrate API')
    .setDescription('This is the API documentation for front end consumption')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Ruta de acceso: /api


  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
