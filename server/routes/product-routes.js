import express from 'express';
import Product from '../src/controller/Product';

const router = express.Router();
router.get('/', Product.getAll);
router.get('/:id', Product.getOne);

export default router;
