import SaleModel from '../models/Sale';

const Sale = {
  getAll(req, res) {
    const sales = SaleModel.findAll();
    return res.send(sales);
  },
  getOne(req, res) {
    const { id } = req.params;
    const sale = SaleModel.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.send(sale);
  },
  create(req, res) {
    const newSale = SaleModel.create(req.body);
    if (newSale.error) {
      res.status(400).send(newSale.error.message);
      return;
    }
    res.status(201).send(newSale);
  },
};
export default Sale;
