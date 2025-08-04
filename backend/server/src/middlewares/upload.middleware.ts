import multer from 'multer';
import path from 'path';
import fs from 'fs';

// uploads 디렉토리 없으면 생성
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // 파일 이름을 고유하게 생성
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 101);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage });

