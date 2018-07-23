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

// 对一些简单的情况，可以使用函数式中间件
export function logger(req, res, next) {
  console.log('requesting...');
  next();
}