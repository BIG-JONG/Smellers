import * as bcrypt from 'bcrypt';
import * as  jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

// 이메일 중복 확인
const checkDuplicateEmail = async (email: string) => {
  const existingUser = await prisma.userInfo.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('ExistEmail'); // → 에러 핸들러에서 처리
  }
};

export const createUser = async (email: string, password: string, nickname: string) => {
  // 서버와 통신 시 유효성 검사 중복체크
  // 1. 값이 들어오는지 
  if (!email || !password || !nickname) {
   throw new Error('Inputvalidation');
  }

  // 2. 값이 중복이 없는지
  await checkDuplicateEmail(email);

  // 3. 비밀번호 해싱 후 DB에 넣기
  const hashed = await bcrypt.hash(password, 10);
  return await prisma.userInfo.create({ data: { email, password: hashed, nickname } });

};

export const verifyUser = async (email: string, password: string) => {
  const user = await prisma.userInfo.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('passwordError');
  }

  // 토큰 생성
  const token = jwt.sign({ id: user.userId }, process.env.SECRET_KEY!, { expiresIn: '1d' });

  console.log('토큰 생성:', token);
  return { token, userId: user.userId };
};


export const updateUserById = async (id: number, data: { nickname?: string; password?: string }) => {
  const updateData: any = {};

  if (data.nickname) updateData.nickname = data.nickname;
  if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

  return await prisma.userInfo.update({
    where: { userId: id },
    data: updateData,
  });
};

export const deleteUserById = async (id: number) => {
  return await prisma.userInfo.delete({
    where: { userId: id },
  });
};
