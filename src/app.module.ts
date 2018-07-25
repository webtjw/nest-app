import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BlogModule } from "./modules/blog/blog.module";
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { BlogController } from 'modules/blog/blog.controller';

@Module({
  imports: [BlogModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(BlogController);
  }
}
