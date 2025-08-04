// utils/deleteFiles.ts
import fs from 'fs';
import path from 'path';
import { PerfumeImg } from '@prisma/client';

/**
 * uploads 폴더 내에 있는 이미지 파일들을 실제로 삭제
 * @param images Prisma에서 조회한 PerfumeImg[] 배열
 */
export const deletePerfumeImageFiles = (images: PerfumeImg[]) => {
  images.forEach((img) => {
    if (img.url_path) {
      const filePath = path.join(__dirname, '../../uploads', img.url_path);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`파일 삭제 실패: ${filePath}`, err.message);
        } else {
          console.log(`파일 삭제 성공: ${filePath}`);
        }
      });
    }
  });
};

//  사용자 이미지 파일 삭제
export const deleteUserImageFiles = (imagePath: string) => {
  // 이미지 경로가 비어있거나 undefined인 경우는 삭제하지 않음
  if (!imagePath) return;

  // 이미지 경로가 상대 경로인 경우를 대비하여 절대 경로로 변환
  const filePath = path.join(__dirname, '../../uploads', imagePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`파일 삭제 실패: ${filePath}`, err.message);
    } else {
      console.log(`파일 삭제 성공: ${filePath}`);
    }
  });
    
};