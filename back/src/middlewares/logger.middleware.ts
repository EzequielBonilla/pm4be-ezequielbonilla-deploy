import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const currentDate = new Date().toLocaleString();
  console.log(
    `[${currentDate}]: Ejecutando método ${req.method} en la ruta ${req.url}`,
  );
  next();
}
