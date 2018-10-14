import express from 'express';
import Product from '../src/controller/Product';

const router = express.Router();
router.get('/', Product.getAll);

export default router;
