import express from 'express';
import Sale from '../controller/Sale';

const router = express.Router();

router.get('/', Sale.getAllSales);
router.get('/:id', Sale.getOneSale);
router.post('/', Sale.createSale);
export default router;
