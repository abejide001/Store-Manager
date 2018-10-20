'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Product = require('../server/src/models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


describe('Product Model', function () {
  describe('find one', function () {
    it('should not return a product for a product id that does not exist', function (done) {
      var count = _Product2.default.findAll().length;
      expect(_Product2.default.findOne(count + 1)).to.not.exist;
      done();
    });
  });
  describe('create', function () {
    it('should increase the number of products', function (done) {
      var count = _Product2.default.findAll().length;
      _Product2.default.create({ name: 'nike jordan', price: 10000, quantityInInventory: 2 });
      expect(_Product2.default.findAll().length).to.equal(count + 1);
      done();
    });
    it('should not return errors for a valid product', function (done) {
      var product = _Product2.default.create({
        name: 'nike jordan',
        price: 1000,
        quantityInInventory: 2
      });
      expect(product.error).to.not.exist;
      done();
    });
    it('should return errors for an invalid product name', function (done) {
      var product = _Product2.default.validate({
        name: 'n',
        price: 5000,
        quantityInInventory: 2
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"name" length must be at least 5 characters long');
      done();
    });
    it('should return errors for an invalid product amount', function (done) {
      var product = _Product2.default.validate({
        name: 'air storm',
        price: 500,
        quantityInInventory: 2
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"price" must be larger than or equal to 1000');
      done();
    });
    it('should return errors for an product with invalid field "id"', function (done) {
      var product = _Product2.default.validate({
        id: 7,
        name: 'nike air',
        price: 5000,
        quantityInInventory: 2
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"id" is not allowed');
      done();
    });
    it('should return errors for an product with invalid field "randomField"', function (done) {
      var product = _Product2.default.validate({
        name: 'air max',
        price: 5000,
        quantityInInventory: 2,
        randomField: 'random'
      });
      expect(product.error).to.exist;
      expect(product.error.details.length).to.equal(1);
      expect(product.error.details[0].message).to.equal('"randomField" is not allowed');
      done();
    });
  });
});