import express from 'express';
import User from '../controller/User';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/signup', Auth.verifyToken, Auth.verifyAdmin, User.register);
router.post('/signin', User.login);
router.put('/edit/:id', Auth.verifyToken, Auth.verifyAdmin, User.editUser);

export default router;
