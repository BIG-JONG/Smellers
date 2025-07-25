import express from 'express';
import { signup,  updateUser, deleteUser } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup);

router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser); 

export default router;