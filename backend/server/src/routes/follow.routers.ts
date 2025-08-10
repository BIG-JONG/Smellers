import express from "express";
import {
  followListingController,
  followUserRegist,
  getAllPublicPosts,
  unfollowingController,
  checkFollowController
} from "../controllers/follow.controller";
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

//팔로우한 사람 상세페이지에서 팔로우, 팔로잉 여부를 결정 - 0810 19시
router.get('/check/:id', authenticateToken, checkFollowController);

export default router;
