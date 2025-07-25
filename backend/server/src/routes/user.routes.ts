<<<<<<< HEAD
import express  from "express";
import { loginController } from "../controllers/user.controller";
import { followlistingController, followUser } from "../controllers/follow.controller";

const router = express.Router();

router.post('/login',loginController);

// 팔로우 리스트 조회
router.get('/:id/following', followlistingController);

//팔로우 한 유저의 전체공개글 보기
router.post('/:id/follow', followUser);
=======
import express from 'express';
import { signup,  updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup);

router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser); 
>>>>>>> origin/khg/backend

export default router;