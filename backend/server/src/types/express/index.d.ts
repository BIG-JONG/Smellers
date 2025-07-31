// server/src/types/express/index.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

export {}; // 이 줄은 global 확장을 인식시키기 위해 필요함
