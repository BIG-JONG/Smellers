import express from "express";
import { followListingController, followUserRegist, getAllPublicPosts, unfollowingController } from "../controllers/follow.controller";
import { authenticateToken } from "../middlewares/auth.middleware";


const router = express.Router();

//팔로우 리스트 조회
router.get('/userList/:id', followListingController);

//팔로우 등록 - 토큰사용
router.get('/userRegister/:id', authenticateToken, followUserRegist);

//팔로우한 유저의 전체공개 글 보기 - 토큰사용
router.get('/allPublicPost', authenticateToken, getAllPublicPosts);

//언팔로우
router.get('/unfollow/:id', authenticateToken, unfollowingController);

export default router;
