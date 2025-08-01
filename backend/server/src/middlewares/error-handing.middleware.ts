import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);

  switch (err.message) {
    case 'Inputvalidation':
      return res.status(400).json({
        errorMessage: '입력된 요청이 잘못되었습니다.',
      });

    case 'ExistEmail':
      return res.status(400).json({
        errorMessage: '가입된 이메일이 있습니다.',
      });

    case 'UserNotFound':
      return res.status(404).json({
        errorMessage: '해당 유저가 없습니다.',
      });

    case 'passwordError':
      return res.status(401).json({
        errorMessage: '패스워드가 일치하지 않습니다.',
      });

    case 'Need login':
      return res.status(401).json({
        errorMessage: '로그인이 필요합니다.',
      });

    case 'DatabaseError':
      return res.status(500).json({
        errorMessage: '데이터베이스 오류입니다.',
      });

    case 'Forbidden':
      return res.status(403).json({
        errorMessage: '권한이 없습니다.',
      });
    case "TokenExpired":
      return res.status(401).send({ 
        errorMessage: "토큰이 만료되었습니다." }
      );
    case "InvalidToken":
      return res.status(401).send({ 
        errorMessage: "유효하지 않은 토큰입니다." 
      });
    case "ToKenNotThing":
      return res.status(401).send({ 
        errorMessage: "토큰이 존재하지 않습니다." 
      });
    case 'PerfumeNotFound':
      return res.status(403).json({
        errorMessage: '해당 향수를 찾을 수 없습니다.'
      }); 
    default:
      return res.status(500).json({
        errorMessage: '서버 오류입니다.',
      });
  }
}