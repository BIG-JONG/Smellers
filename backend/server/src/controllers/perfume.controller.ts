// perfume.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as perfumeService from '../services/perfume.service';

// 향수 생성
export const createPerfume = async (req: Request, res: Response, next: NextFunction) => {

  //console.log('User from req:', req.user);
  try {
    // multer로부터 받은 파일들
    const files = req.files as Express.Multer.File[];

    // 이미지 URL 경로 추출 (또는 S3라면 location)
    const images = files.map(file => ({
      url_path: `/uploads/${file.filename}`, // 정적 라우팅 필요
    }));

    console.log('이미지 경로:', images);

    //console.log('req.body.notes:', req.body.notes);
    //console.log('req.body.images:', req.body.images);
    const parsedNotes = JSON.parse(req.body.notes || '[]');

    //const perfume = await perfumeService.createPerfume(req.body, req.user!.user_id);
    const perfume = await perfumeService.createPerfume({
      ...req.body,
    price: Number(req.body.price),
    point: Number(req.body.point),
    images,
    notes: parsedNotes,
    }, req.user!.user_id);
    res.status(201).json(perfume);
  } catch (err) {
    console.log('createPerfume err 시작');
    next(err);
  }
};



// 향수 상세 조회
export const getPerfumeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.perfume_id);
    const perfume = await perfumeService.getPerfumeById(perfumeId);
    res.json(perfume);
  } catch (err) {
    next(err);
  }
};

// 향수 수정
export const updatePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.perfume_id);
    const perfume = await perfumeService.updatePerfume(perfumeId, req.body, req.user!.user_id);
    res.json(perfume);
  } catch (err) {
    next(err);
  }
};

// 향수 삭제
export const deletePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.perfume_id);
    await perfumeService.deletePerfume(perfumeId, req.user!.user_id);
    res.json({ message: '향수가 삭제되었습니다.' });
  } catch (err) {
    next(err);
  }
};