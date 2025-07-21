import express  from "express";
import { loginController } from "../controllers/user.controller";

const router = express.Router();

router.post('/login',loginController);

export default router;