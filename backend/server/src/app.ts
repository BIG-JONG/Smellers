import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import perfumeRoutes from './routes/perfume.routes';
import errorHandler from './middlewares/error-handing.middleware';
import path from 'path';
import followRoutes from './routes/follow.routers';
import {limiter} from './middlewares/rateLimit.middleware'


const PORT = process.env.PORT || 4000;

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 라우팅
app.use('/users', userRoutes);
app.use('/perfumes', perfumeRoutes);
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