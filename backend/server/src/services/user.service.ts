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
