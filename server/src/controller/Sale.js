import SaleModel from '../models/Sale';

const Sale = {
  getAll(req, res) {
    const sales = SaleModel.findAll();
    return res.send(sales);
  },
};
export default Sale;
