import { Request, Response } from "express";
import { getpublicPerfumesService } from "../services/perfume.service";



export const getPublicPerfumes = async (req: Request, res: Response) => {
  try {
    const publicPerfumes = await getpublicPerfumesService();
    res.json({ data: publicPerfumes });
  } catch (error: any) {
    res.status(401).json({ errorMessage: error.message });
  }
};

export const myPerfumeList = async (req: Request, res: Response): Promise<void> => { }
