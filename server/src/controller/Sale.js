import SaleModel from '../models/Sale';

const Sale = {
  async createSale(req, res) {
    const newSale = await SaleModel.create(req.body);
    if (newSale.errors.length !== 0) {
      res.status(400).send(newSale);
      return;
    }
    res.status(201).send({
      message: 'sale created',
      newSale,
    });
  },
  getOneSale(req, res) {
    const { id } = req.params;
    const sale = SaleModel.findOne(id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.status(200).send(sale);
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
