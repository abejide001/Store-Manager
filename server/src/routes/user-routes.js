import express from 'express';
import User from '../controller/User';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/signup', Auth.verifyToken, Auth.verifyAdmin, User.register);
router.post('/signin', User.login);

export default router;
