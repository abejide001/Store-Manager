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
