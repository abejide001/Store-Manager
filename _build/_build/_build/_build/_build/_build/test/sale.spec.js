'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

describe('GET /sales', function () {
  it('should return all sales records', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales').end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});
describe('GET /sales/:id', function () {
  it('should return 404 if id is invalid', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 10).end(function (err, res) {
      expect(res.status).to.equal(404);
      done(err);
    });
  });
  it('should return a sale record if id is valid', function (done) {
    _chai2.default.request(_index2.default).get('/api/v1/sales/' + 1).end(function (err, res) {
      expect(res.status).to.equal(200);
      done(err);
    });
  });
});