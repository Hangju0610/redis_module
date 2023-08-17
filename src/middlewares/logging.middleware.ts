import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      // statusCode
      const { statusCode } = res;
      // responseTime을 계산하여 대입
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `${statusCode} [${method}] ${originalUrl} - ${responseTime}ms`,
      );
    });

    next();
  }
}
