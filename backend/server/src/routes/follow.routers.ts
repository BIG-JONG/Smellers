import express  from "express";
import { followListingController } from "../controllers/follow.controller";

const router = express.Router();


router.get('/following/post',followListingController);

export default router;