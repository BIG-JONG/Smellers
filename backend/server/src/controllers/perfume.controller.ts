import { Request, Response } from "express";
import { getpublicPerfumesService, getMyPerfumesService, getSearchPerfumeService } from "../services/perfume.service";
import { NoteType } from "@prisma/client";
import { PerfumeSearchParams } from "../types/PerfumeSearchParams";
import { parseNoteType } from "../utils/changeNoteType";



export const getMyPerfumeController = async (req: Request, res: Response): Promise<void> => {
  try {
    //헤더에서 id값 가져오기(auth-토큰)
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ errorMessage: "no user ID" });
      return;
    }

    const myPerfumes = await getMyPerfumesService(userId);
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
    const noteType = parseNoteType(NoteType);
    const noteName = data.noteName ?? null;
    const nickname = data.nickname ?? null;

    const searchParams = {
      brandName,
      perfumeName,
      noteType,
      noteName,
      nickname,
    };


    const searchedPerfumes = await getSearchPerfumeService(searchParams);
    res.json({ data: searchedPerfumes });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};


export const getPublicPerfumes = async (req: Request, res: Response) => {
  try {
    const publicPerfumes = await getpublicPerfumesService();
    res.json({ data: publicPerfumes });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};