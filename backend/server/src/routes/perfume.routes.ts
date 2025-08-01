import express from 'express';
import {
  createPerfume,
  getPerfumeById,
  updatePerfume,
  deletePerfume,
} from '../controllers/perfume.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { postsValidator, getPostsValidator, putPostsValidator, handleValidationResult } 
from '../middlewares/validation-result-handle';
import { authorizeSelf } from '../middlewares/authorization.middleware';
import  { upload } from '../middlewares/upload.middleware';

const router = express.Router();

router.post('/', postsValidator, authenticateToken,
 //  handleValidationResult, upload.array('images'),createPerfume); // 향수 등록
   handleValidationResult, createPerfume); // 향수 등록
router.get('/:perfume_id',getPostsValidator,authenticateToken,handleValidationResult, getPerfumeById); // 상세 조회
router.put('/:perfume_id', putPostsValidator,authenticateToken, handleValidationResult, updatePerfume); // 수정
router.delete('/:perfume_id',getPostsValidator,authenticateToken, handleValidationResult, deletePerfume); // 삭제

export default router;