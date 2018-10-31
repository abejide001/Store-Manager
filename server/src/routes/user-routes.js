import express from 'express';
import User from '../controller/User';

const router = express.Router();

router.post('/', User.register);

export default router;
