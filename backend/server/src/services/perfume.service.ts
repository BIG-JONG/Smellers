import prisma from '../prisma/client';

export const getpublicPerfumesService = async () => {
  return await prisma.perfumeInfo.findMany({
    where: {
      isPublic: 'Y',
    },
    include: {
      images: true,
      notes: true,
    },
  });
}

export const getSearchPerfumeService = async(data: JSON) => {
  return await prisma.perfumeInfo.findMany({
    where: {
    }
  })
}

export const getMyPerfumesService = async (userId: number) => {
   return await prisma.perfumeInfo.findMany({
    where: {
      userId: userId,
      perfumeStatus: 'Y',  // 예: 삭제된 건 빼고
    },
    include: {
      images: true,
      notes: true,
    },
  });
}
