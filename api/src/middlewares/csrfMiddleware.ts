import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

const csrfProtection = csrf({ cookie: true });

export const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  
  if (safeMethods.includes(req.method)) {
    return next(); 
  }

  return csrfProtection(req, res, next); 
};