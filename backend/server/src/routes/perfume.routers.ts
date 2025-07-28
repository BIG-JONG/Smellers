import express  from "express";
import { authenticateToken} from "../middlewares/auth.middleware";
import { authorizeSelf } from "../middlewares/authorization.middleware";
import { getPublicPerfumes, myPerfumeList } from "../controllers/perfume.controller";

const router = express.Router();

//전체공개 향수 검색
router.get('/public', getPublicPerfumes);

//향수 리스트 조회(개인)
router.get('/',  myPerfumeList, authenticateToken, authorizeSelf)


export default router;