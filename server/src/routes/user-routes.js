import express from 'express';
import User from '../controller/User';

const router = express.Router();

router.post('/signup', User.register);
router.post('/signin', User.login);

export default router;
