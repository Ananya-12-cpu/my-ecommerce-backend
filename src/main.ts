import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My Ecommerce Backend API')
    .setDescription('API documentation for the products, categories and cart modules')
    .setVersion('1.0')
    .addTag('categories')
    .addTag('products')
    .addTag('carts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8000);
}
await bootstrap();
