import prisma from '../prisma/client';
//enum타입 사용
import { NoteType } from '@prisma/client';
import { PerfumeSearchParams } from '../types/PerfumeSearchParams';



export const getMyPerfumesService = async (userId: number) => {
  return await prisma.perfumeInfo.findMany({
    where: {
      userId: userId,
      perfumeStatus: 'Y',  // 예: 삭제된 건 빼고
    },
    select: {
      images: {
        select: {
          url: true,
        }
      },
      notes: {
        select: {
          noteType: true,
          noteName: true,
        },
      },
    }
  });
}

export const getSearchPerfumeService = async (data: PerfumeSearchParams) => {
    const { brandName, perfumeName, noteType, noteName, nickname } = data;
  return await prisma.perfumeInfo.findMany({
    where: {
      //data가 타입이 PerfumeSearchParams이기때문에 undefined
      brandName: brandName ?? undefined,
      perfumeName: perfumeName ?? undefined,
      notes:{
        some:{
          noteType: noteType ?? undefined,
          noteName: noteName ?? undefined,
        },
      },
      user:{
        nickname: nickname ?? undefined
      }
    },
    //결과 - 모든 테이블 호출
    include: {
      notes: true,
      images: true,
      user: true,
    },
  })
}



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
