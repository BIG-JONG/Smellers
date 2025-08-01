// server/src/types/express/index.d.ts

declare module 'express' {
  export interface Request {
    user?: {
      user_id: number;
    };
  }
}