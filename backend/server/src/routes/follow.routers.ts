import express  from "express";
import { loginController } from "../controllers/user.controller";

const router = express.Router();


router.get('/following/post',loginController);

export default router;