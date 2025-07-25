import prisma from '../prisma/client';

export const followListingService = async (id: number) => {
  if(!id) throw new Error("User ID is required")
  
  const followings = await prisma.followingList.findMany({
    where: {
      userId: id,               // 나(팔로우한 사람)
      followStatus: 'Y',    // 활성 팔로우만
    },
    select: {
      followerId: true,       // 내가 팔로우한 유저 ID만 추출
      createdAt: true,      // 팔로우한 시각
    },
  });

  return followings;
}