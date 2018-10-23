import chai from 'chai';
import SaleModel from '../server/src/models/Sale';

const { expect } = chai;

describe('Sale Model', () => {
  describe('find one', () => {
    it('should not return a sale for a sale id that does not exist', (done) => {
      const count = SaleModel.findAll().length;
      expect(SaleModel.findOne(count + 1)).to.not.exist;
      done();
    });
  });
  describe('create', () => {
    it('should increase the number of sales', (done) => {
      const count = SaleModel.findAll().length;
      SaleModel.create({ productName: 'nike jordan', quantitySold: 2 });
      expect(SaleModel.findAll().length).to.equal(count + 1);
      done();
    });
    it('should not return errors for a valid sale', (done) => {
      const sale = SaleModel.create({
        productName: 'nike jordan',
        quantitySold: 1,
      });
      expect(sale.errors).to.be.empty;
      done();
    });
    it('should return errors for an invalid sale productName', (done) => {
      const sale = SaleModel.create({
        productName: 'n',
        quantitySold: 3,
      });
      expect(sale.errors).to.not.be.empty;
      expect(sale.errors.length).to.equal(1);
      expect(sale.errors[0]).to.equal('"productName" length must be at least 5 characters long');
      done();
    });
    it('should return errors for an invalid quantitySold', (done) => {
      const sale = SaleModel.create({
        productName: 'air storm',
        quantitySold: -1,
      });
      expect(sale.errors).to.not.be.empty;
      expect(sale.errors.length).to.equal(1);
      expect(sale.errors[0]).to.equal('"quantitySold" must be larger than or equal to 1');
      done();
    });
  });
});
