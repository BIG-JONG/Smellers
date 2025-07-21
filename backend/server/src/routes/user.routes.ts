import express from 'express';
import { signup,  updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/users/signup', signup);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser); 

export default router;