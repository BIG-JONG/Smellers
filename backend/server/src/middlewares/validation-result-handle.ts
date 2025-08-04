import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// 회원가입 유효성 검사
export const signUpValidator = [
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다.')
    .notEmpty().withMessage('이메일이 없습니다.'),
  body('password')
    .isLength({ min: 8 }).withMessage('비밀번호가 8자리 이하입니다.')
    .notEmpty().withMessage('비밀번호가 없습니다.'),
  body('nickname')
    .notEmpty().withMessage('닉네임이 없습니다.')
];

// 로그인 유효성 검사
export const loginValidator = [
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다.')
    .notEmpty().withMessage('이메일이 없습니다.'),
  body('password')
    .notEmpty().withMessage('비밀번호가 없습니다.')
];

// 향수등록 유효성 검사
export const postsValidator = [
  // body('perfumeName')
  //   .notEmpty().withMessage('향수이름이 없습니다.'),
  // body('content')
  //   .notEmpty().withMessage('내용이 없습니다.')
];

// 향수 조회/삭제 유효성 검사
export const getPostsValidator = [
  param('perfume_id')
    .isInt().withMessage('perfume ID는 숫자여야 합니다.')
    .notEmpty().withMessage('perfume ID가 없습니다.')
];

// 향수수정 유효성 검사
export const putPostsValidator = [
  param('perfume_id')
    .isInt().withMessage('perfume ID는 숫자여야 합니다.')
    .notEmpty().withMessage('perfume ID가 없습니다.')
  // body('perfumeName')
  //   .notEmpty().withMessage('향수이름이 없습니다.'),
  // body('content')
  //   .notEmpty().withMessage('내용이 없습니다.')
];

// 유효성 검사 결과 처리 미들웨어
export const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => err.msg);
    console.log('Validation Error:', extractedErrors);
    return next(new Error('Inputvalidation'));
  }
 // console.log('Validation passed');
  next();
};