<<<<<<< HEAD
import express from 'express';
import { signup, login, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { signUpValidator, loginValidator, handleValidationResult } from '../middlewares/validation-result-handle';
import { authorizeSelf } from '../middlewares/authorization.middleware';

const router = express.Router();

router.post('/signup', signUpValidator, handleValidationResult, signup);// 회원가입
router.post('/login', loginValidator, handleValidationResult, login);// 로그인
router.put('/:id', authenticateToken,authorizeSelf, updateUser);// 사용자 정보 수정
router.delete('/:id', authenticateToken,authorizeSelf,  deleteUser); // 사용자 삭제
=======
import express  from "express";
import { loginController } from "../controllers/user.controller";
import { followlistingController, followUser } from "../controllers/follow.controller";

const router = express.Router();

router.post('/login',loginController);

// 팔로우 리스트 조회
router.get('/:id/following', followlistingController);

//팔로우 한 유저의 전체공개글 보기
router.post('/:id/follow', followUser);
>>>>>>> parent of b9d91ed (Merge branch 'origin/khg/backend' into kgb/backend)

export default router;