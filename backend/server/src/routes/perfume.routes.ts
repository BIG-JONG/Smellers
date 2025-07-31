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

router.post('/', postsValidator, authenticateToken, authorizeSelf,
 //  handleValidationResult, upload.array('images'),createPerfume); // 향수 등록

   handleValidationResult, createPerfume); // 향수 등록
router.get('/:id',getPostsValidator,authenticateToken, authorizeSelf,handleValidationResult, getPerfumeById); // 상세 조회
router.put('/:id', putPostsValidator,authenticateToken, authorizeSelf, handleValidationResult, updatePerfume); // 수정
router.delete('/:id',getPostsValidator,authenticateToken, authorizeSelf, handleValidationResult, deletePerfume); // 삭제

export default router;