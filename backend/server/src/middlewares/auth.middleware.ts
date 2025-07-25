<<<<<<< HEAD
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errorMessage: "토큰이 없습니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ errorMessage: "유효하지 않은 토큰입니다." });
  }
};
=======
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
>>>>>>> origin/khg/backend
