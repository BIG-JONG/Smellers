import { Request, Response } from "express";
import { followListingService, followUserRegistService, getAllPublicPostsService } from "../services/follow.service";

export const followListingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const idInt = parseInt(id, 10);
    const list = await followListingService(idInt);
    res.status(200).json({ data: list });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};

export const followUserRegist = async (req: Request, res: Response): Promise<void> => {
  try {
    const followerUserId = Number(req.params.id); // 팔로우  대상자
    const userId = Number(req.user?.user_id) // 미들웨어에서 넣은 로그인한 사용자 ID (예: JWT 기반)


    await followUserRegistService(userId, followerUserId);

    res.status(200).json({ message: '팔로우 완료' });
  } catch (err) {
    // 에러 객체가 Error일 경우, message를 반환하고, 그렇지 않으면 err 자체를 반환
    const errorMessage = err instanceof Error ? err.message : '알 수 없는 에러 발생';
    res.status(500).json({ message: '팔로우 실패', error: errorMessage });
  }
};

export const getAllPublicPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.user_id); // 토큰에서 추출

    const perfumes = await getAllPublicPostsService(userId);

    res.status(200).json(perfumes);
  } catch (err) {
    res.status(500).json({ message: '향수 글 조회 실패', error: err });
  }
};
