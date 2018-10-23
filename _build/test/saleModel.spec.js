'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Sale = require('../server/src/models/Sale');

var _Sale2 = _interopRequireDefault(_Sale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


describe('Sale Model', function () {
  describe('find one', function () {
    it('should not return a sale for a sale id that does not exist', function (done) {
      var count = _Sale2.default.findAll().length;
      expect(_Sale2.default.findOne(count + 1)).to.not.exist;
      done();
    });
  });
  describe('create', function () {
    it('should increase the number of sales', function (done) {
      var count = _Sale2.default.findAll().length;
      _Sale2.default.create({ productName: 'nike jordan', quantitySold: 2 });
      expect(_Sale2.default.findAll().length).to.equal(count + 1);
      done();
    });
    it('should not return errors for a valid sale', function (done) {
      var sale = _Sale2.default.create({
        productName: 'nike jordan',
        quantitySold: 1
      });
      expect(sale.errors).to.be.empty;
      done();
    });
    it('should return errors for an invalid sale productName', function (done) {
      var sale = _Sale2.default.create({
        productName: 'n',
        quantitySold: 3
      });
      expect(sale.errors).to.not.be.empty;
      expect(sale.errors.length).to.equal(1);
      expect(sale.errors[0]).to.equal('"productName" length must be at least 5 characters long');
      done();
    });
    it('should return errors for an invalid quantitySold', function (done) {
      var sale = _Sale2.default.create({
        productName: 'air storm',
        quantitySold: -1
      });
      expect(sale.errors).to.not.be.empty;
      expect(sale.errors.length).to.equal(1);
      expect(sale.errors[0]).to.equal('"quantitySold" must be larger than or equal to 1');
      done();
    });
  });
});