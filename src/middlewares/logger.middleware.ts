import { Injectable, NestMiddleware, MiddlewareFunction } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(): MiddlewareFunction {
    return (req, res, next) => {
      const {path, method} = req;
      const beginTime = Date.now()
      console.log(`[${method} ${path}] [processing]`);
      next();
      console.log(`[${method} ${path}] [done by using ${Date.now() - beginTime} ms]`);
    }
  }
}

// 对一些简单的情况，可以使用函数式中间件
export function logger(req, res, next) {
  console.log('requesting...');
  next();
}