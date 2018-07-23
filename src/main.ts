import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) 全局中间件的写法
  await app.listen(3000);
}
bootstrap();
