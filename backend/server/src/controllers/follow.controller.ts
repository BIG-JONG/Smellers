import { Request, Response } from "express";
import { followListingService } from "../services/follow.service";

export const followListingController = async (req: Request, res: Response): Promise<void> => {
  console.log("여기")
  try {
    const id = req.params.id;
    const idInt = parseInt(id, 10);

    const list = await followListingService(idInt);
    res.status(200).json({ data: list });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};

// export const followUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     const token = await loginService(email, password);
//     res.status(200).json({ accessToken: token });
//   } catch (error: any) {
//     res.status(401).json({ errorMessage: error.message });
//   }
// };

// export const getFollowAllPost = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     const token = await loginService(email, password);
//     res.status(200).json({ accessToken: token });
//   } catch (error: any) {
//     res.status(401).json({ errorMessage: error.message });
//   }
// };
