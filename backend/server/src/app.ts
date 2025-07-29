import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/error-handing.middleware';
import followRoutes from './routes/follow.routers';
import perfumeRoutes from './routes/perfume.routers'

const PORT = process.env.PORT || 4000;

dotenv.config({ path: './.env' });

const app = express();

// 미들웨어 설정
app.use(cors());
//JSON 파싱
app.use(express.json());
// URL-encoded 폼 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// 유저 라우팅
app.use('/users', userRoutes);

// 향수 라우팅
app.use('/perfumes', perfumeRoutes); // 향수 API 추가할 경우

// 팔로우 라우팅
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
