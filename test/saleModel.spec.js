import chai from 'chai';
import SaleModel from '../server/src/models/Sale';

const should = chai.should(); // eslint-disable-line
const { expect } = chai;
describe('Sale Model', () => {
  it('should increase the number of sales', (done) => {
    const count = SaleModel.findAll().length;
    SaleModel.create({ productName: 'nike jordan', quantitySold: 2 });
    expect(SaleModel.findAll().length).to.equal(count + 1);
    done();
  });
});
