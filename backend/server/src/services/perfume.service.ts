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

  //console.log('images:', images);
  //console.log('notes:', notes);
  
  const createData: any = {
    ...perfumeData,
    user: {
      connect: { userId },
    },
    notes: {
      create: notes.map((note: PerfumeNoteInput) => ({
        noteType: note.noteType,
        noteName: note.noteName,
      })),
    },
  };

  // 이미지가 있을 경우에만 추가
  if (images && Array.isArray(images) && images.length > 0) {
    createData.images = {
      create: images.map((img: PerfumeImageInput) => ({
        url_path: img.url_path,
      })),
    };
  }

  return await prisma.perfumeInfo.create({
    data: createData,
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

  const { notes = [], images, ...perfumeData } = data;

  const transactionSteps = [];

  // 항상 노트는 삭제하고 새로 등록
  transactionSteps.push(
    prisma.perfumeNote.deleteMany({ where: { perfumeId: perfume_id } }),
    prisma.perfumeNote.createMany({
      data: notes.map((note: { noteType: NoteType; noteName: string }) => ({
        perfumeId: perfume_id,
        noteType: note.noteType,
        noteName: note.noteName,
      })),
    })
  );

  // 이미지가 존재할 때만 기존 이미지 삭제 및 재등록
  if (images && Array.isArray(images) && images.length > 0) {
    const existingImages = await prisma.perfumeImg.findMany({ where: { perfumeId: perfume_id } });
    deletePerfumeImageFiles(existingImages); // 실제 파일 삭제

    transactionSteps.push(
      prisma.perfumeImg.deleteMany({ where: { perfumeId: perfume_id } }),
      prisma.perfumeImg.createMany({
        data: images.map((img: { url_path: string }) => ({
          perfumeId: perfume_id,
          url_path: img.url_path,
        })),
      })
    );
  }

  // 향수 기본 정보 업데이트
  transactionSteps.push(
    prisma.perfumeInfo.update({
      where: { perfumeId: perfume_id },
      data: { ...perfumeData },
    })
  );

  //const updatedPerfume = await prisma.$transaction(transactionSteps);
  const [, , updatedPerfume] = await prisma.$transaction(transactionSteps);
  console.log('향수 수정 완료:', updatedPerfume);
  const perfumeup = await prisma.perfumeInfo.findUnique({ where: { perfumeId: perfume_id } });
  return perfumeup;
};

// 향수 상세 조회
// export const getPerfumeById = async (perfume_id: number) => {
//   const perfume = await prisma.perfumeInfo.findUnique({
//     where: { perfumeId: perfume_id },
//     include: { notes: true, images: true },
//   });
//   if (!perfume) throw new Error ('PerfumeNotFound');
//   return perfume;
// };
export const getPerfumeById = async (perfume_id: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({
    where: { perfumeId: perfume_id },
    include: { 
      notes: true, 
      images: true, 
      user: {
        select: {
          userId: true,
          nickname: true,
          profileImg: true,
        }
      }
    },
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
    console.log('deletePerfume 사용자 ID가 일치하지 않습니다.');
    throw new Error('Forbidden'); 
    
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
    include: {
      images: true,
      notes: true,
    },
    
  });
}




// 1️⃣ 기본 필터 (항상 적용, AND)
// perfumeStatus = 'Y' → 삭제되지 않은 향수만
// isPublic = 'Y' → 공개된 향수만

// 2️⃣ 검색 조건 (사용자가 입력하면 OR)
// brandName LIKE '%입력값%' → 브랜드명에 포함된 경우
// perfumeName LIKE '%입력값%' → 향수명에 포함된 경우
// noteType = 입력값 OR noteName LIKE '%입력값%' → 노트 타입이 일치하거나 노트 이름에 포함된 경우
// nickname LIKE '%입력값%' → 작성자 닉네임에 포함된 경우
export const getSearchPerfumeService = async (data: PerfumeSearchParams) => {
  const { brandName, perfumeName, noteType, noteName, nickname } = data;

  // 🔎 OR 조건에 들어갈 배열
  const orConditions: any[] = [];

  // 브랜드명 검색 (부분 일치, 대소문자 구분 없음)
  if (brandName) {
    orConditions.push({
      brandName: { contains: brandName, mode: 'insensitive' },
    });
  }

  // 향수명 검색 (부분 일치, 대소문자 구분 없음)
  if (perfumeName) {
    orConditions.push({
      perfumeName: { contains: perfumeName, mode: 'insensitive' },
    });
  }

  // 노트 검색 (noteType / noteName 중 하나라도 매칭되면 포함)
  if (noteType || noteName) {
    orConditions.push({
      notes: {
        some: {
          noteType: noteType ?? undefined,
          noteName: noteName
            ? { contains: noteName, mode: 'insensitive' }
            : undefined,
        },
      },
    });
  }

  // 작성자 닉네임 검색 (부분 일치, OR에 포함)
  if (nickname) {
    orConditions.push({
      user: {
        nickname: { contains: nickname, mode: 'insensitive' },
      },
    });
  }

  // ❗ 검색 조건이 아예 없으면 빈 배열 반환 (전체 공개 향수 노출 방지)
  if (orConditions.length === 0) {
    return [];
  }

  return await prisma.perfumeInfo.findMany({
    where: {
      AND: [
        { perfumeStatus: 'Y' },  // ✅ 항상 조건: 삭제되지 않은 향수
        { isPublic: 'Y' },       // ✅ 항상 조건: 공개된 향수
        { OR: orConditions },    // ✅ 하나라도 매칭되면 검색 결과 포함
      ],
    },
    include: {
      notes: true,   // 향수 노트 포함
      images: true,  // 향수 이미지 포함
      user: true,    // 작성자 정보 포함
    },
  });
};





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

export const getNoteListService = async (noteType: string) => {
  if (!noteType) {
    throw new Error('노트 타입이 필요합니다.');
  }

  return await prisma.perfumeNoteData.findMany({
    where: {
      noteType: noteType as NoteType, // NoteType은 Prisma에서 정의된 enum 타입입니다.
    },
    select: {
      noteName: true,
    },
  });
}