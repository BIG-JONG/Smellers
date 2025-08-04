import { Request, Response, NextFunction } from 'express';

/**
 * 사용자 본인만 접근 허용하는 인가 미들웨어

 */
export const authorizeSelf = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIdFromToken = req.user?.user_id; // auth.middleware.ts에서 넣어줌
    const userId =
      req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT'
        ? parseInt(req.params.user_id, 10)
        : parseInt(req.body.user_id, 10);


    console.log('authorizeSelf userIdFromToken:', userIdFromToken);
    console.log('authorizeSelf params userId:', userId);


    if (userIdFromToken && userIdFromToken === userId) {
      return next(); // 통과
    }
    return next(new Error('Forbidden')); // 그 외는 막기

    next();
  } catch (error) {
    next(error);
  }
};