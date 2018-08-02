import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const {path, method} = req;
      console.log(`[${method} ${path}] [processing]`);
      next();
    }
  }
}

// 对一些简单的情况，可以使用函数式中间件
export function logger(req, res, next) {
  console.log('requesting...');
  next();
}