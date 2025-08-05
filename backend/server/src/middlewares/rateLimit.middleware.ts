import { rateLimit } from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';

//limiter 생성
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  handler(req, res) { // 제한 초과 시 콜백 함수 
  res.status(429).json({
      message: '1분에 10번만 요청 할 수 있습니다.__kgb',
    });
  },
});

// RateLimit 정보를 응답 헤더에 넣는 middleware
export const addRateLimitHeaders = (req: Request, res: Response, next: NextFunction) => {
  if (req.rateLimit) {
    res.set({
      'X-RateLimit-Limit': req.rateLimit.limit.toString(),
      'X-RateLimit-Remaining': req.rateLimit.remaining.toString(),
      'X-RateLimit-Reset': dayjs(req.rateLimit.resetTime).format('YYYY-MM-DD HH:mm:ss'),
    });
  } else {
    // 이 경우는 거의 없지만, 디버깅 로그 남겨도 좋음
    console.warn('req.rateLimit is undefined. Check middleware order.');
  }
  next();
};
