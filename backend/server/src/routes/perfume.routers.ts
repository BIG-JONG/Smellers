import express  from "express";
import { authenticateToken} from "../middlewares/auth.middleware";
import { authorizeSelf } from "../middlewares/authorization.middleware";
import { getPublicPerfumes, getMyPerfumeController, getSearchPerfume } from "../controllers/perfume.controller";

const router = express.Router();

//향수 리스트 조회(개인)
router.get('/',  getMyPerfumeController, authenticateToken, authorizeSelf);

//향수 조건별 검색
router.post('/search', getSearchPerfume);

//전체공개 향수 검색
router.get('/public', getPublicPerfumes);



export default router;