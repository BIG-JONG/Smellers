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
