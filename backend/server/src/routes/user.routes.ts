import express from 'express';
import { signup, login, updateUser, deleteUser, UserById, findUserByNickname } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { signUpValidator, loginValidator, handleValidationResult } from '../middlewares/validation-result-handle';
import { authorizeSelf } from '../middlewares/authorization.middleware';
import { upload } from '../middlewares/upload.middleware';
import { loginLimiter } from "../middlewares/rateLimit.middleware";

const router = express.Router();

router.post('/signup', signUpValidator, handleValidationResult, signup);// 회원가입
router.post('/login', loginLimiter, loginValidator, handleValidationResult, login);// 로그인
router.put('/:user_id', authenticateToken, authorizeSelf, upload.single('images'), updateUser);// 사용자 정보 수정
router.delete('/:user_id', authenticateToken, authorizeSelf, deleteUser); // 사용자 삭제
router.get('/:user_id', authenticateToken, authorizeSelf, UserById); // 사용자 정보 조회
router.get('/findUser/:nickname', authenticateToken, findUserByNickname); // 닉네임으로 사용자 조회

export default router;