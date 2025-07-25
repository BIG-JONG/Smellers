<<<<<<< HEAD
import { Request, Response } from "express";
import { loginService } from "../services/user.service";

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.status(200).json({ accessToken: token });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};
=======
import { Request, Response } from 'express';
import { createUser, verifyUser } from '../services/user.service';
import { updateUserById, deleteUserById } from '../services/user.service';

export const signup = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  console.log("어디까지 갔니");
  try {
    await createUser(email, password, nickname);
    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(400).json({ error: '회원가입 실패' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, userId } = await verifyUser(email, password);
    res.json({ token, userId });
  } catch (err) {
    res.status(401).json({ error: '로그인 실패' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nickname, password } = req.body;
  const requesterId = req.user?.id;

  if (parseInt(id) !== requesterId) {
    return res.status(403).json({ error: '본인만 수정할 수 있습니다' });
  }

  try {
    await updateUserById(requesterId, { nickname, password });
    res.json({ message: '수정 완료' });
  } catch (err) {
    res.status(400).json({ error: '수정 실패' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const requesterId = req.user?.id;

  if (parseInt(id) !== requesterId) {
    return res.status(403).json({ error: '본인만 삭제할 수 있습니다' });
  }

  try {
    await deleteUserById(requesterId);
    res.json({ message: '삭제 완료' });
  } catch (err) {
    res.status(400).json({ error: '삭제 실패' });
  }
};
>>>>>>> origin/khg/backend
