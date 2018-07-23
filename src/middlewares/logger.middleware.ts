import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const beginTime = Date.now()
      console.log('request processing...');
      next();
      console.log(`request processing finish after ${Date.now() - beginTime} ms`)
    }
  }
}