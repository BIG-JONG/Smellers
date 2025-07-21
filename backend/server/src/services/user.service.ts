import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

export const createUser = async (email: string, password: string, nickname: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return await prisma.uSER_INFO.create( { email, password: hashed, nickname } );

};

export const verifyUser = async (email: string, password: string) => {
  const user = await prisma.uSER_INFO.findUnique({ where: {email } });
  if (!user || !(await bcrypt.compare(password, user.PASSWORD))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.USER_ID }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  return { token, userId: user.USER_ID };
};

export const updateUserById = async (id: number, data: { nickname?: string; password?: string }) => {
  const updateData: any = {};

  if (data.nickname) updateData.nickname = data.nickname;
  if (data.password) updateData.password = await bcrypt.hash(data.password, 10);

  return await prisma.uSER_INFO.update({
    where: { id },
    data: updateData,
  });
};

export const deleteUserById = async (id: number) => {
  return await prisma.uSER_INFO.delete({
    where: { id },
  });
};