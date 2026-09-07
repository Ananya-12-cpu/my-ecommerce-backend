import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
  });

  const config = new DocumentBuilder()
    .setTitle('My Ecommerce Backend API')
    .setDescription('API documentation for the products, categories, cart and orders modules')
    .setVersion('1.0')
    .addTag('categories')
    .addTag('products')
    .addTag('carts')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
await bootstrap();
