import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from "./modules/blog/blog.module";
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { BlogController } from 'modules/blog/blog.controller';

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController, BlogController);
  }
}
