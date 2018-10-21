'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Sale = require('../server/src/models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should(); // eslint-disable-line
var expect = _chai2.default.expect;

describe('Sale Model', function () {
  it('should increase the number of sales', function (done) {
    var count = _Sale2.default.findAll().length;
    _Sale2.default.create({ productName: 'nike jordan', quantitySold: 2 });
    expect(_Sale2.default.findAll().length).to.equal(count + 1);
    done();
  });
  it('should not return a sale for a sale id that does not exist', function (done) {
    var count = _Sale2.default.findAll().length;
    expect(_Sale2.default.findOne(count + 1)).to.not.exist;
    done();
  });
  it('should not return errors for a valid sale', function (done) {
    var sale = _Sale2.default.create({
      productName: 'nike jordan',
      quantitySold: 2
    });
    expect(sale.error).to.not.exist;
    done();
  });
  it('should return errors for an invalid sale name', function (done) {
    var sale = _Sale2.default.validate({
      productName: 'naa',
      quantitySold: 2
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"productName" length must be at least 5 characters long');
    done();
  });
  it('should return errors if quantity sold is lower than one', function (done) {
    var sale = _Sale2.default.validate({
      productName: 'nike air',
      quantitySold: 0
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"quantitySold" must be larger than or equal to 1');
    done();
  });
  it('should return errors if quantity sold is greater than 10', function (done) {
    var sale = _Sale2.default.validate({
      productName: 'nike air',
      quantitySold: 11
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"quantitySold" must be less than or equal to 10');
    done();
  });
  it('should return errors for an sale with invalid field "id"', function (done) {
    var sale = _Sale2.default.validate({
      id: 7,
      productName: 'nike air',
      quantitySold: 2
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"id" is not allowed');
    done();
  });
  it('should return errors for an sale with invalid field "randomField"', function (done) {
    var sale = _Sale2.default.validate({
      productName: 'air max',
      quantitySold: 2,
      randomField: 'random'
    });
    expect(sale.error).to.exist;
    expect(sale.error.details.length).to.equal(1);
    expect(sale.error.details[0].message).to.equal('"randomField" is not allowed');
    done();
  });
});