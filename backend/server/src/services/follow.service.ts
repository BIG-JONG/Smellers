import prisma from '../prisma/client';

//팔로우 조회
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
          userId: true,       // 여기에 userId 꼭 포함!
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
  const perfumes = await prisma.perfumeInfo.findMany({
    where: {
      userId: userId,
      perfumeStatus: 'Y',
    },
    include: {
      images: true,
      notes: true,
      user: {
        select: {
          userId: true,
          nickname: true,
          email: true,
          profileImg: true,
          userStatus: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return perfumes;
};

export const unfollowingService = async (userId: number, followerId: number) => {
  const updated = await prisma.followingList.updateMany({
    where: {
      userId,
      followerId,
      followStatus: 'Y',
    },
    data: {
      followStatus: 'N',
    },
  });

  if (updated.count === 0) {
    throw new Error('언팔로우 대상이 없거나 이미 언팔 상태입니다');
  }

  return { message: 'Unfollowed successfully' };
};

// - 0810 19시 컨트롤러 상세페이지에서 팔로우 여부조회 
export const isFollowingService = async (myUserId: number, targetUserId: number) => {
  const follow = await prisma.followingList.findFirst({
    where: {
      userId: myUserId,
      followerId: targetUserId,
      followStatus: 'Y',
    },
  });

  return !!follow;
};