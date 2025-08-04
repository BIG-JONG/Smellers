import prisma from '../prisma/client';

export const followListingService = async (userId: number) => {
  if (!userId) throw new Error("User ID is required")

   const followings = await prisma.followingList.findMany({
    where: {
      userId: userId,
      followStatus: 'Y',
    },
    select: {
      followerId: true,
      createdAt: true,
      updatedAt: true,
      followed: {      
        select: {
          nickname: true,
          email: true,
          profileImg: true,
          userStatus: true,
        }
      }
    }
  });

  return followings;
}

export const followUserRegistService = async (userId: number, followerUserId: number) => {
  if (userId === followerUserId) {
    throw new Error("자기 자신을 팔로우할 수 없습니다.");
  };

  // 이미 팔로우했는지 확인
  const existing = await prisma.followingList.findFirst({
    where: {
      userId: userId,
      followerId: followerUserId,
    },
  });

  if (existing) {
    if (existing.followStatus === 'Y') {
      throw new Error('이미 팔로우 중입니다.');
    } else {
      // soft delete된 상태 => followStatus === N 면 다시 활성화
      await prisma.followingList.update({
        where: {
          followId: existing.followId,
          followerId: existing.followerId,
        },
        data: { followStatus: 'Y' },
      });
    }
  } else {
    // 새로 팔로우
    await prisma.followingList.create({
      data: {
        userId: userId,
        followerId: followerUserId,
        followStatus: 'Y',
      },
    });
  }
};

export const getAllPublicPostsService = async (userId: number) => {
  // 내가 팔로우한 유저들의 ID 추출
  const followings = await prisma.followingList.findMany({
    where: {
      userId: userId,
      followStatus: 'Y',
    },
    select: {
      followerId: true,
    },
  });

  // follow아이디 배열 분리하기
  const followingIds = followings.map(f => f.followerId);

  // 그 유저들이 등록한 전체공개 향수글 찾기
  const perfumes = await prisma.perfumeInfo.findMany({
    where: {
      userId: { in: followingIds },
      perfumeStatus: 'Y', // 공개된 향수글
    },
    include: {
      images: true,
      notes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return perfumes;
};