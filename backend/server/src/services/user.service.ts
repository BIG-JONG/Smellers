<<<<<<< HEAD
import prisma from "../prisma/client";
import * as  jwt from 'jsonwebtoken'
import * as bcrypt  from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export const loginService = async (email: string, password: string): Promise<string> => {
  const user = await prisma.userInfo.findFirst({ where: { email } });
  if (!user) {
    throw new Error("존재하지 않는 사용자입니다.")
  };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("비밀번호가 일치하지 않습니다.")
  };

  const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};
=======
import * as bcrypt from 'bcrypt';
import * as  jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

//중복 검사
const checkDuplicate = async (email: string, password: string, nickname: string) => {
  const user = await prisma.userInfo.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)) || !nickname) {
    throw new Error('duplicate user');
  }
};

export const createUser = async (email: string, password: string, nickname: string) => {
  // 서버와 통신 시 유효성 검사 중복체크
  // 1. 값이 들어오는지 
  if (!email || !password || !nickname) {
    return null;
  }

  // 2. 값이 중복이 없는지
  await checkDuplicate(email, password, nickname);

  // 3. 비밀번호 해싱 후 DB에 넣기
  const hashed = await bcrypt.hash(password, 10);
  return await prisma.userInfo.create({ data: { email, password: hashed, nickname } });

};

export const verifyUser = async (email: string, password: string) => {
  const user = await prisma.userInfo.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET!, { expiresIn: '1d' });
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
>>>>>>> origin/khg/backend
