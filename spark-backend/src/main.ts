import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
      origin: [
          "localhost:4200"
      ],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
