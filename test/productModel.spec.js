import chai from 'chai';
import ProductModel from '../server/src/models/Product';

const { expect } = chai;

describe('Product Model', () => {
  describe('find one', () => {
    it('should not return a product for a product id that does not exist', (done) => {
      const count = ProductModel.findAll().length;
      expect(ProductModel.findOne(count + 1)).to.not.exist;
      done();
    });
  });
  describe('create', () => {
    it('should increase the number of products', (done) => {
      const count = ProductModel.findAll().length;
      ProductModel.create({ name: 'nike jordan', price: 10000, quantityInInventory: 2 });
      expect(ProductModel.findAll().length).to.equal(count + 1);
      done();
    });
    it('should not return errors for a valid product', (done) => {
      const product = ProductModel.create({
        name: 'nike jordan',
        price: 1000,
        quantityInInventory: 2,
      });
      expect(product.errors).to.be.empty;
      done();
    });
    it('should return errors for an invalid product name', (done) => {
      const product = ProductModel.create({
        name: 'n',
        price: 5000,
        quantityInInventory: 2,
      });
      expect(product.errors).to.not.be.empty;
      expect(product.errors.length).to.equal(1);
      expect(product.errors[0]).to.equal('"name" length must be at least 5 characters long');
      done();
    });
    it('should return errors for an invalid product amount', (done) => {
      const product = ProductModel.create({
        name: 'air storm',
        price: 500,
        quantityInInventory: 2,
      });
      expect(product.errors).to.not.be.empty;
      expect(product.errors.length).to.equal(1);
      expect(product.errors[0]).to.equal('"price" must be larger than or equal to 1000');
      done();
    });
  });
});
