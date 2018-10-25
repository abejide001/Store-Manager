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
  it('should not return a sale for a sale id that does not exist', (done) => {
    const count = SaleModel.findAll().length;
    expect(SaleModel.findOne(count + 1)).to.not.exist;
    done();
  });
  it('should not return errors for a valid sale', (done) => {
    const sale = SaleModel.create({
      productName: 'nike jordan',
      quantitySold: 2,
    });
    expect(sale.error).to.not.exist;
    done();
  });
  it('should return errors for an invalid sale name', (done) => {
    const sale = SaleModel.validate({
      productName: 'naa',
      quantitySold: 2,
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"productName" length must be at least 5 characters long');
    done();
  });
  it('should return errors if quantity sold is lower than one', (done) => {
    const sale = SaleModel.validate({
      productName: 'nike air',
      quantitySold: 0,
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"quantitySold" must be larger than or equal to 1');
    done();
  });
  it('should return errors if quantity sold is greater than 10', (done) => {
    const sale = SaleModel.validate({
      productName: 'nike air',
      quantitySold: 11,
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"quantitySold" must be less than or equal to 10');
    done();
  });
  it('should return errors for an sale with invalid field "id"', (done) => {
    const sale = SaleModel.validate({
      id: 7,
      productName: 'nike air',
      quantitySold: 2,
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"id" is not allowed');
    done();
  });
  it('should return errors for an sale with invalid field "randomField"', (done) => {
    const sale = SaleModel.validate({
      productName: 'air max',
      quantitySold: 2,
      randomField: 'random',
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"randomField" is not allowed');
    done();
  });
});
