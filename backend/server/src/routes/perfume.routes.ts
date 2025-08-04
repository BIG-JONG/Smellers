import express from 'express';
import {
  createPerfume,
  getPerfumeById,
  updatePerfume,
  deletePerfume,
  getPublicPerfumes, 
  getMyPerfumeController, 
  getSearchPerfume,
} from '../controllers/perfume.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { postsValidator, getPostsValidator, putPostsValidator, handleValidationResult } from '../middlewares/validation-result-handle';
import { authorizeSelf } from '../middlewares/authorization.middleware';
import  { upload } from '../middlewares/upload.middleware';


const router = express.Router();

//향수 조건별 검색
router.post('/search', getSearchPerfume);

//전체공개 향수 검색
router.get('/public', getPublicPerfumes);

router.post('/', postsValidator, authenticateToken,
   handleValidationResult, upload.array('images',1),createPerfume); // 향수 등록(파일등록 포함)
router.get('/:perfume_id',getPostsValidator,authenticateToken,handleValidationResult, getPerfumeById); // 상세 조회
router.get('/public/:perfume_id',getPostsValidator,handleValidationResult, getPerfumeById); // 상세 조회
router.put('/:perfume_id', putPostsValidator,authenticateToken, 
  handleValidationResult, upload.array('images',1), updatePerfume); // 수정(파일등록 포함)
router.delete('/:perfume_id',getPostsValidator,authenticateToken, handleValidationResult, deletePerfume); // 삭제

router.get('/',authenticateToken, getMyPerfumeController);



export default router;