import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우팅
app.use('/users', userRoutes);
// app.use('/perfumes', perfumeRoutes); // 향수 API 추가할 경우

// 기본 라우터 (헬스체크)
app.get('/', (req, res) => {
  res.send('API 서버가 정상적으로 실행 중입니다!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
export default app;