// src/types/express/index.d.ts
import { Request } from 'express';

//테스트용
import 'express-rate-limit';

//테스트용
import 'express-rate-limit';

declare module 'express' {
  export interface Request {
    user?: {
      user_id: number;
    };
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    rateLimit?: import('express-rate-limit').RateLimitRequestHandler['request']['rateLimit'];
  }
}