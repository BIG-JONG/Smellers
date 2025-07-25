<<<<<<< HEAD
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';


const SECRET_KEY = process.env.SECRET_KEY || 'smeller'; // 환경 변수
console.log('SECRET_KEY:', SECRET_KEY); // 디버깅용 로그
interface CustomJwtPayload extends JwtPayload {
  userId: number;
}
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];// Authorization 헤더에서 토큰을 가져옴
  const token = authHeader?.split(' ')[1]; // Bearer 토큰 형식에서 토큰 부분만 추출
  try {
    if (!token)  throw new Error('ToKenNotThing'); // 토큰이 없으면 에러 처리;
  
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number }; // 토큰 검증 함수 호출
    req.user = { id: decoded.id }; // 확장된 타입 필요
    next();
  } catch (err:any) {
    if (err.name === 'TokenExpiredError') {
      return next(new Error('TokenExpired'));
    } else if (err.name === 'JsonWebTokenError') {
      return next(new Error('InvalidToken'));
    } else {
      return next(err);
    }// 토큰이 없거나 유효하지 않으면 에러 처리}
=======
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
>>>>>>> parent of b9d91ed (Merge branch 'origin/khg/backend' into kgb/backend)
  }
};
