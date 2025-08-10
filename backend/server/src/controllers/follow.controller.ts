import { Request, Response } from "express";
import {
  followListingService,
  followUserRegistService,
  getAllPublicPostsService,
  unfollowingService,
  isFollowingService
} from "../services/follow.service";
import prisma from "../prisma/client";

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
    const userId = Number(req.query.userId);
    if (!userId || isNaN(userId)) {
      res.status(400).json({ message: '유효하지 않은 userId입니다.' });
      return;
    }

    const perfumes = await getAllPublicPostsService(userId);

    const userInfo = await prisma.userInfo.findUnique({
      where: { userId },
      select: {
        userId: true,
        nickname: true,
        email: true,
        profileImg: true,
        userStatus: true,
      },
    });

    res.status(200).json({ data: { userInfo, perfumes } });
  } catch (err) {
    res.status(500).json({ message: '유저 공개 글 조회 실패', error: err });
  }
};

export const unfollowingController = async (req: Request, res: Response): Promise<void> => {
  try {
    const followerId = parseInt(req.params.id, 10); // 언팔 대상
    const userId = req.user?.user_id; // 토큰에서 추출된 나 (팔로우한 사람)

    if (!userId || isNaN(followerId)) {
      throw new Error('필요한 값이 없습니다.');
    }

    const result = await unfollowingService(userId, followerId);
    res.status(200).json({ data: result });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};

// - 0810 19시 컨트롤러 상세페이지에서 팔로우 여부조회 
export const checkFollowController = async (req: Request, res: Response) => {
  try {
    const myUserId = req.user.userId; // auth 미들웨어에서 넣어준 로그인 사용자 ID
    const targetUserId = parseInt(req.params.id, 10);

    if (isNaN(targetUserId)) {
      return res.status(400).json({ message: '잘못된 사용자 ID입니다.' });
    }

    const isFollowing = await isFollowingService(myUserId, targetUserId);

    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '팔로우 여부 확인 실패' });
  }
};




// export const getAllPublicPosts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = Number(req.user?.user_id); // 토큰에서 추출

//     const perfumes = await getAllPublicPostsService(userId);

//     res.status(200).json(perfumes);
//   } catch (err) {
//     res.status(500).json({ message: '향수 글 조회 실패', error: err });
//   }
// };
