'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Validation = {
  validateProductName: function validateProductName(validateSale) {
    if (!validateSale.value.productName) {
      validateSale.errors.push('"productName" is required');
      return validateSale;
    }
    if (validateSale.value.productName.length < 5) {
      validateSale.errors.push('"productName" length must be at least 5 characters long');
    }
    if (validateSale.value.productName.length > 15) {
      validateSale.errors.push('"productName" length must be at most 15 characters long');
    }
    return validateSale;
  },
  validatequantitySold: function validatequantitySold(validateSale) {
    if (!validateSale.value.quantitySold) {
      validateSale.errors.push('"quantitySold" is required');
      return validateSale;
    }
    if (validateSale.value.quantitySold < 0) {
      validateSale.errors.push('"quantitySold" must be larger than or equal to 1');
    }
    return validateSale;
  },
  validate: function validate(sale) {
    var validateSale = {};
    validateSale.errors = [];
    validateSale.value = sale;
    this.validateProductName(validateSale);
    this.validatequantitySold(validateSale);
    return validateSale;
  }
};
exports.default = Validation;