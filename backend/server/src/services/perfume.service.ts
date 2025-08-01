import prisma from '../prisma/client';
import { NoteType } from '@prisma/client';
import { deletePerfumeImageFiles } from '../utils/deleteFiles';
import { PerfumeSearchParams } from '../types/PerfumeSearchParams';

type PerfumeNoteInput = {
  noteType: NoteType; // NoteType은 Prisma에서 정의된 enum 타입입니다.
  noteName: string;
};

type PerfumeImageInput = {
  url_path: string;
};

// 향수 생성
export const createPerfume = async (data: any, userId: number) => {
  const { notes = [], images = [], user_id, ...perfumeData } = data;

  console.log('images:', images);
  console.log('notes:', notes);
  
  return await prisma.perfumeInfo.create({
    data: {
    ...perfumeData, // perfumeName, brandName, content 등 문자열/숫자 필드
    user: {
      connect: { userId }, // FK 연결
    },
    notes: {
      create: notes.map((note : PerfumeNoteInput) => ({
        noteType: note.noteType,
        noteName: note.noteName,
      })),
    },
    images: {
      create: images.map((img :PerfumeImageInput) => ({
        url_path: img.url_path,
      })),
    },
  },
  include: {
    notes: true,
    images: true,
  },
  });
};

// 향수 수정
export const updatePerfume = async (perfume_id: number, data: any, userId: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({ where: { perfumeId: perfume_id } });

  if (!perfume) throw new Error('PerfumeNotFound');
  if (perfume.userId !== userId) {
    console.log('updatePerfume 사용자 ID가 일치하지 않습니다.');
    throw new Error('Forbidden');
  }

  const { notes = [], images = [], ...perfumeData }: {
    notes: { noteType: NoteType; noteName: string }[];
    images: { url_path: string }[];
  } = data;

  // 기존 이미지 파일 삭제
  const existingImages = await prisma.perfumeImg.findMany({ where: { perfumeId: perfume_id } });
  deletePerfumeImageFiles(existingImages);

  // note와 이미지 DB삭제
  return await prisma.$transaction([
    prisma.perfumeNote.deleteMany({
      where: { perfumeId: perfume_id },
    }),
    prisma.perfumeImg.deleteMany({
      where: { perfumeId :perfume_id},
    }),

    // 향수 정보 업데이트
    prisma.perfumeInfo.update({
      where: { perfumeId: perfume_id },
      data: {
        ...perfumeData,
        user: { connect: { userId } },
        notes: {
          create: notes.map((note) => ({
            noteType: note.noteType,
            noteName: note.noteName,
          })),
        },
        images: {
          create: images.map((img) => ({
            url_path: img.url_path,
          })),
        },
      },
      include: {
        notes: true,
        images: true,
      },
    }),
  ]).then(([, , updatedPerfume]) => updatedPerfume);
};

// 향수 상세 조회
export const getPerfumeById = async (perfume_id: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({
    where: { perfumeId: perfume_id },
    include: { notes: true, images: true },
  });
  if (!perfume) throw new Error ('PerfumeNotFound');
  return perfume;
};



// 향수 삭제
export const deletePerfume = async (perfume_id: number, userId: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({ where: { perfumeId: perfume_id } });
  // 향수 정보가 없으면 에러 발생
  if (!perfume ) throw new Error ('PerfumeNotFound');
  // 요청한 사용자와 향수 소유자가 다르면 에러 발생
  if(perfume.userId !== userId) {
    throw new Error('Forbidden'); 
    console.log('deletePerfume 사용자 ID가 일치하지 않습니다.');
  }

  // 기존 이미지 파일 삭제
  const perfumeImgData = await prisma.perfumeImg.findMany({ where: { perfumeId: perfume_id } });
  deletePerfumeImageFiles(perfumeImgData);

  // 연관된 향노트/이미지 먼저 삭제 후 향수 삭제 (트랜잭션)
  await prisma.$transaction([
    prisma.perfumeNote.deleteMany({
      where: { perfumeId: perfume_id },
    }),
    prisma.perfumeImg.deleteMany({
      where: { perfumeId :perfume_id},
    }),
    prisma.perfumeInfo.update({
      where: { perfumeId:perfume_id },
      data: { perfumeStatus: 'N' },
    }),
  ]);
};



export const getMyPerfumesService = async (userId: number) => {
  return await prisma.perfumeInfo.findMany({
    where: {
      userId: userId,
      perfumeStatus: 'Y',  // 예: 삭제된 건 빼고
    },
    select: {
      images: {
        select: {
           url_path: true,
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
