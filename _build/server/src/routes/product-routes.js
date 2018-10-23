'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Product = require('../controller/Product');

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/', _Product2.default.getAllProducts);
router.get('/:id', _Product2.default.getOneProduct);
router.post('/', _Product2.default.createProducts);

exports.default = router;