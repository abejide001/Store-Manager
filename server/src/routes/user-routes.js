import express from 'express';
import User from '../controller/User';
import Auth from '../middleware/Auth';
import Validate from '../middleware/user';

const router = express.Router();

router.post('/signup', Auth.verifyToken, Auth.verifyAdmin, Validate.validateSignUp, User.register);
router.post('/signin', Validate.validateSignin, User.login);

export default router;
