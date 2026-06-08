import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acceso no autorizado, token faltante' });

  jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user as AuthRequest['user'];
    next();
  });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acceso denegado, se requiere rol de administrador' });
  }
  next();
};
