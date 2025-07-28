// perfume.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as perfumeService from '../services/perfume.service';

// 향수 생성
export const createPerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfume = await perfumeService.createPerfume(req.body, req.user!.id);
    res.status(201).json(perfume);
  } catch (err) {
    next(err);
  }
};



// 향수 상세 조회
export const getPerfumeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.id);
    const perfume = await perfumeService.getPerfumeById(perfumeId);
    res.json(perfume);
  } catch (err) {
    next(err);
  }
};

// 향수 수정
export const updatePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.id);
    const perfume = await perfumeService.updatePerfume(perfumeId, req.body, req.user!.id);
    res.json(perfume);
  } catch (err) {
    next(err);
  }
};

// 향수 삭제
export const deletePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.id);
    await perfumeService.deletePerfume(perfumeId, req.user!.id);
    res.json({ message: '향수가 삭제되었습니다.' });
  } catch (err) {
    next(err);
  }
};