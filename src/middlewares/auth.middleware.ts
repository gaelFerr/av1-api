import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ erro: 'Token não informado' });
    return;
  }

  const token = header.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}