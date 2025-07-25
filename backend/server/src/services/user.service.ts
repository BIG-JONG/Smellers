import * as bcrypt  from 'bcrypt';
import * as  jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

export const createUser = async (email: string, password: string, nickname: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return await prisma.userInfo.create( {data: { email , password: hashed, nickname } });

};

export const verifyUser = async (email: string, password: string) => {
  const user = await prisma.userInfo.findUnique({ where: {email } });
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
    where: { userId : id },
    data: updateData,
  });
};

export const deleteUserById = async (id: number) => {
  return await prisma.userInfo.delete({
    where: { userId: id },
  });
};