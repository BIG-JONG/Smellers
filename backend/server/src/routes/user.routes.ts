import express from 'express';
import { signup, login, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { signUpValidator, loginValidator, handleValidationResult } from '../middlewares/validation-result-handle';
import { authorizeSelf } from '../middlewares/authorization.middleware';


const router = express.Router();

router.post('/signup', signUpValidator, handleValidationResult, signup);// 회원가입
router.post('/login', loginValidator, handleValidationResult, login);// 로그인
router.put('/:id', authenticateToken, authorizeSelf, updateUser);// 사용자 정보 수정
router.delete('/:id', authenticateToken, authorizeSelf, deleteUser); // 사용자 삭제


export default router;