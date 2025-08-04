import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import perfumeRoutes from './routes/perfume.routes'; // 향수 API 라우트 추가
import errorHandler from './middlewares/error-handing.middleware';
import path from 'path';
<<<<<<< HEAD
import followRoutes from './routes/follow.routers';
import {limiter} from './middlewares/rateLimit.middleware'
=======
//import followRoutes from './routes/follow.routers';
import followRoutes from './routes/follow.routers'
>>>>>>> 1860d66 (fix:팔로우 리스트 조회, 토큰 인증 순서 수정)

const PORT = process.env.PORT || 4000;

dotenv.config({ path: './.env' });

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));// 정적 파일 서빙



// 라우팅
app.use('/users', userRoutes);
app.use('/perfumes', perfumeRoutes); // 향수 API 추가할 경우

// 엔드포인트 /followings/posts만
app.use('/following', followRoutes);

//에러 핸들러 미들웨어는 라우팅 이후에 설정
app.use(errorHandler);


// 기본 라우터 (헬스체크)
app.get('/', (req, res) => {
  res.send('API 서버가 정상적으로 실행 중입니다!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
