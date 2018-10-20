import chai from 'chai';
import ProductModel from '../server/src/models/Product';

const should = chai.should(); // eslint-disable-line
const { expect } = chai;
describe('Product Model', () => {
  it('should increase the number of products', (done) => {
    const count = ProductModel.findAll().length;
    ProductModel.create({ name: 'nike jordan', price: 10000, quantityInInventory: 2 });
    expect(ProductModel.findAll().length).to.equal(count + 1);
    done();
  });
});
describe('validate', () => {
  it('should not return errors for a valid product', (done) => {
    const error = ProductModel.validate({
      name: 'nike jordan',
      price: 1000,
      quantityInInventory: 2,
    });
    expect(error.error).to.be.null;
    done();
  });
  it('should return errors for an invalid product', (done) => {
    const error = ProductModel.validate({
      name: 'n',
      price: 5000,
      quantityInInventory: 2,
    });
    expect(error.error).to.exist;
    done();
  });
});
