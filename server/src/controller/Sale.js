import SaleModel from '../models/Sale';

const Sale = {
  getAllSales(req, res) {
    const sales = SaleModel.findAll();
    return res.status(200).send(sales);
  },
  getOneSale(req, res) {
    const { id } = req.params;
    const sale = SaleModel.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.send(sale);
  },
  createSales(req, res) {
    const newSale = SaleModel.create(req.body);
    if (newSale.errors.length !== 0) {
      res.status(400).send(newSale);
      return;
    }
    res.status(201).send({
      message: 'sale created',
      newSale,
    });
  },
};
export default Sale;
