import { Request, Response, NextFunction } from 'express';
import { createUser, verifyUser, updateUserById, deleteUserById,getUserById, getUserByNickname } from '../services/user.service';
import { validationResult } from 'express-validator';
import { getuid } from 'process';
import { deleteUserImageFiles } from '../utils/deleteFiles';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, nickname } = req.body;
  try {
    await createUser(email, password, nickname);
    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
      next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const { token, user_id } = await verifyUser(email, password);
    res.json({ token, user_id });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { nickname, password } = req.body;
  const requesterId = req.user?.user_id;

  if (parseInt(user_id) !== requesterId) {
    return res.status(403).json({ error: '본인만 수정할 수 있습니다' });
  }

  try {
    const existingUser = await getUserById(requesterId); // 기존 사용자 정보 조회
    console.log('기존 사용자 정보:', existingUser);
    let profileImage: string | undefined;

    //  이미지 파일이 업로드된 경우
    if (req.file) {
      profileImage = `${req.file.filename}`;
      console.log('업로드된 이미지 경로:', profileImage);

      // 기존 이미지 파일이 있다면 삭제
      if (existingUser.profileImg) {
        deleteUserImageFiles(existingUser.profileImg);
        console.log('기존 이미지 파일 삭제 완료');
      }
    }

    await updateUserById(requesterId, { nickname, password, ...(profileImage && { profileImage }), });
    res.json({ message: '수정 완료' });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response , next: NextFunction) => {
  const { user_id } = req.params;
  const requesterId = req.user?.user_id;

  if (parseInt(user_id) !== requesterId) {
    return res.status(403).json({ error: '본인만 삭제할 수 있습니다' });
  }

  try {
    await deleteUserById(requesterId);
    res.json({ message: '삭제 완료' });
  } catch (err) {
    next(err);
  }
};

export const UserById = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const requesterId = req.user?.user_id;

  if (parseInt(user_id) !== requesterId) {
    return res.status(403).json({ error: '본인만 조회할 수 있습니다' });
  }

  try {
    const user = await getUserById(requesterId);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const findUserByNickname = async (req: Request, res: Response, next: NextFunction) => {
  const { nickname } = req.params;

  try {
    const user = await getUserByNickname(nickname);
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};