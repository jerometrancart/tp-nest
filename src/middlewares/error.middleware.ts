import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await next();
    } catch (err) {
      // Logique de gestion des erreurs
      console.error(err);

      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal Server Error';

      if (err instanceof HttpStatusError) {
        status = err.getStatus();
        message = err.message;
      }

      res.status(status).json({ statusCode: status, message });
    }
  }
}

export class HttpStatusError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
  ) {
    super(message);
  }

  getStatus(): number {
    return this.status;
  }
}
