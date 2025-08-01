import express  from "express";
import { followListingController, followUserRegist, getAllPublicPosts} from "../controllers/follow.controller";

const router = express.Router();

//팔로우 리스트 조회
router.get('/userList/:id',followListingController);

//팔로우 등록
router.post('/userRegister/:id',followUserRegist);

//팔로우한 유저의 전체공개 글 보기
router.get('/allPublicPost',getAllPublicPosts);

export default router;
