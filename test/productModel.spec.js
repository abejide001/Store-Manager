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
      expect(product.error).to.not.exist;
      done();
    });
    it('should return errors for an invalid product name', (done) => {
      const product = ProductModel.validate({
        name: 'n',
        price: 5000,
        quantityInInventory: 2,
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"name" length must be at least 5 characters long');
      done();
    });
    it('should return errors for an invalid product amount', (done) => {
      const product = ProductModel.validate({
        name: 'air storm',
        price: 500,
        quantityInInventory: 2,
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"price" must be larger than or equal to 1000');
      done();
    });
    it('should return errors for an product with invalid field "id"', (done) => {
      const product = ProductModel.validate({
        id: 7,
        name: 'nike air',
        price: 5000,
        quantityInInventory: 2,
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"id" is not allowed');
      done();
    });
    it('should return errors for an product with invalid field "randomField"', (done) => {
      const product = ProductModel.validate({
        name: 'air max',
        price: 5000,
        quantityInInventory: 2,
        randomField: 'random',
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"randomField" is not allowed');
      done();
    });
  });
});
