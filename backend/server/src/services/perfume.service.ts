import prisma from '../prisma/client';


// 향수 생성
export const createPerfume = async (data: any, userId: number) => {
  const { notes = [], images = [], user_id, ...perfumeData } = data;

  console.log('images:', images);
  console.log('notes:', notes);
  
  return await prisma.perfumeInfo.create({
    data: {
      ...perfumeData,
      userId,
      notes: {
        create: notes.map((note: { noteType: string; noteName: string }) => ({
          noteType: note.noteType,
          noteName: note.noteName,
        })),
      },
      images: {
        create: images.map((img: { url_path: string }) => ({
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

// 향수 상세 조회
export const getPerfumeById = async (id: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({
    where: { perfumeId: id },
    include: { notes: true, images: true },
  });
  if (!perfume) throw new Error ('PerfumeNotFound');
  return perfume;
};

// 향수 수정
export const updatePerfume = async (id: number, data: any, userId: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({ where: { perfumeId: id } });
  // 향수 정보가 없으면 에러 발생
  if (!perfume ) throw new Error ('PerfumeNotFound');
  // 요청한 사용자와 향수 소유자가 다르면 에러 발생
  if(perfume.userId !== userId) {
    throw new Error('Forbidden'); 
    console.log('updatePerfume 사용자 ID가 일치하지 않습니다.');
  }
  
  const { notes, ...perfumeData } = data;

  // 기존 향노트 삭제
  await prisma.perfumeNote.deleteMany({
    where: { perfumeId:id },
  });

  // 향수 정보 업데이트 + 새로운 향노트 등록
  return await prisma.perfumeInfo.update({
    where: { perfumeId:id },
    data: {
      ...perfumeData,
      notes: {
        create: notes.map((note: { noteType: string; noteName: string }) => ({
          noteType: note.noteType,
          noteName: note.noteName,
        })),
      },
    },
    include: {
      notes: true,
    },
  });
};

// 향수 삭제
export const deletePerfume = async (id: number, userId: number) => {
  const perfume = await prisma.perfumeInfo.findUnique({ where: { perfumeId: id } });
  // 향수 정보가 없으면 에러 발생
  if (!perfume ) throw new Error ('PerfumeNotFound');
  // 요청한 사용자와 향수 소유자가 다르면 에러 발생
  if(perfume.userId !== userId) {
    throw new Error('Forbidden'); 
    console.log('deletePerfume 사용자 ID가 일치하지 않습니다.');
  }

  // 연관된 향노트/이미지 먼저 삭제 후 향수 삭제 (트랜잭션)
  await prisma.$transaction([
    prisma.perfumeNote.deleteMany({
      where: { perfumeId: id },
    }),
    prisma.perfumeImg.deleteMany({
      where: { perfumeId :id},
    }),
    prisma.perfumeInfo.update({
      where: { perfumeId:id },
      data: { perfumeStatus: 'N' },
    }),
  ]);
};