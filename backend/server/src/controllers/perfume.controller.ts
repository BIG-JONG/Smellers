// perfume.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as perfumeService from '../services/perfume.service';
import { parseNoteType } from '../utils/changeNoteType';
import { PerfumeSearchParams } from '../types/PerfumeSearchParams';

// 향수 생성
export const createPerfume = async (req: Request, res: Response, next: NextFunction) => {

  try {
    // 이미지 파일이 있는 경우만 처리
   
    const files = req.files as Express.Multer.File[];
     let images = undefined;
    if (files && files.length > 0) {
      images = files.map((file) => ({
        url_path: `${file.filename}`,
      }));
       console.log('파일 이미지 업로드:', images);
    }

    // notes가 JSON 문자열로 전달되므로 파싱
    const parsedNotes = JSON.parse(req.body.notes || '[]');

    //const perfume = await perfumeService.createPerfume(req.body, req.user!.user_id);
    const perfume = await perfumeService.createPerfume({
      ...req.body,
      price: Number(req.body.price),
      point: Number(req.body.point),
      ...(images && { images }), // 이미지가 있을 때만 포함
      notes: parsedNotes,
    }, req.user!.user_id);

    res.status(201).json(perfume);
  } catch (err) {
    console.log('createPerfume err 시작');
    next(err);
  }
};

// 향수 수정
export const updatePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.perfume_id);

    // 이미지 파일이 있는 경우만 처리
    let images = undefined;
    const files = req.files as Express.Multer.File[];
    if (files && files.length > 0) {
      images = files.map((file) => ({
        url_path: `${file.filename}`,
      }));
       console.log('파일 수정용 이미지 업로드:', images);
    }


   
    console.log('req.body.notes:', req.body.notes);
   
    // notes가 JSON 문자열로 전달되므로 파싱
    const parsedNotes = JSON.parse(req.body.notes || '[]');

    const perfume = await perfumeService.updatePerfume(perfumeId, {
      ...req.body,
      price: Number(req.body.price),
      point: Number(req.body.point),
      ...(images && { images }), // 이미지가 있을 때만 포함
      notes: parsedNotes,
    }, req.user!.user_id);

    res.json(perfume);
  } catch (err) {
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



// 향수 삭제
export const deletePerfume = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const perfumeId = Number(req.params.perfume_id);
    await perfumeService.deletePerfume(perfumeId, req.user!.user_id);
    res.json({ message: '향수가 삭제되었습니다.' });
  } catch (err) {
    next(err);
  }
}

export const getMyPerfumeController = async (req: Request, res: Response): Promise<void> => {
  try {
    //헤더에서 id값 가져오기(auth-토큰)
    const userId = req.user?.user_id;
    console.log(userId)

    if (!userId) {
      res.status(401).json({ errorMessage: "no user ID" });
      return;
    }

    const myPerfumes = await perfumeService.getMyPerfumesService(userId);
    console.log(myPerfumes)
    res.status(200).json({ data: myPerfumes });
  } catch (error: any) {
    res.status(500).json({ errorMessage: error.message });
  }
}

export const getSearchPerfume = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // 내가 정한 이름으로 매핑
    const brandName = data.brand ?? null;
    const perfumeName = data.perfumeName ?? null;
    //enum 노트타입의 예외
    const noteType = parseNoteType(data.NoteType);
    const noteName = data.noteName ?? null;
    const nickname = data.nickname ?? null;

    const searchParams: PerfumeSearchParams = {
      brandName,
      perfumeName,
      noteType,
      noteName,
      nickname,
    };


    const searchedPerfumes = await perfumeService.getSearchPerfumeService(searchParams);
    res.json({ data: searchedPerfumes });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};


export const getPublicPerfumes = async (req: Request, res: Response) => {
  try {
    const publicPerfumes = await perfumeService.getpublicPerfumesService();
    res.json({ data: publicPerfumes });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};