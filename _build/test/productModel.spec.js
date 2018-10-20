'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Product = require('../server/src/models/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should(); // eslint-disable-line
var expect = _chai2.default.expect;

describe('Product Model', function () {
  it('should increase the number of products', function (done) {
    var count = _Product2.default.findAll().length;
    _Product2.default.create({ name: 'nike jordan', price: 10000, quantityInInventory: 2 });
    expect(_Product2.default.findAll().length).to.equal(count + 1);
    done();
  });
});
describe('validate', function () {
  it('should not return errors for a valid product', function (done) {
    var error = _Product2.default.validate({
      name: 'nike jordan',
      price: 1000,
      quantityInInventory: 2
    });
    expect(error.error).to.be.null;
    done();
  });
  it('should return errors for an invalid product', function (done) {
    var error = _Product2.default.validate({
      name: 'n',
      price: 5000,
      quantityInInventory: 2
    });
    expect(error.error).to.exist;
    done();
  });
});