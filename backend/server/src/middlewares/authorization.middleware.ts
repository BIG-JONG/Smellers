import { Request, Response, NextFunction } from 'express';

/**
 * 사용자 본인만 접근 허용하는 인가 미들웨어
 */
export const authorizeSelf = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIdFromToken = req.user?.id; // auth.middleware.ts에서 넣어줌
    const userId = parseInt(req.params.id, 10);

    //console.log('요청된 사용자 ID:', userId);
    //console.log('토큰에서 추출한 사용자 ID:', userIdFromToken); 

    if (!userIdFromToken || userIdFromToken !== userId) {
      return next(new Error("Forbidden"));
    }

    next();
  } catch (error) {
    next(error);
  }
};