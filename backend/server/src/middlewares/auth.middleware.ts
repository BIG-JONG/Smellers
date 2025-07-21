import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    req.user = { id: decoded.id }; // 확장된 타입 필요
    next();
  } catch (err) {
    return res.status(403).json({ error: '토큰이 유효하지 않습니다' });
  }
};