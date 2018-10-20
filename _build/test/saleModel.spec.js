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
});