// src/types/express/index.d.ts
import { Request } from 'express';

declare module 'Express' {
  export interface Request {
    user?: {
      user_id: number;
    };
  }
}