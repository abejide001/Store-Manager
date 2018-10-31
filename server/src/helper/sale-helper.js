const Validation = {
  validateProductName(validateSale) {
    if (!validateSale.value.product_name) {
      validateSale.errors.push('"product_name" is required');
      return validateSale;
    }
    if (validateSale.value.product_name.length < 5) {
      validateSale.errors.push('"product_name" length must be at least 5 characters long');
    }
    if (validateSale.value.product_name.length > 15) {
      validateSale.errors.push('"product_name" length must be at most 15 characters long');
    }
    return validateSale;
  },
  validatequantitySold(validateSale) {
    if (!validateSale.value.quantity_sold) {
      validateSale.errors.push('"quantity_sold" is required');
      return validateSale;
    }
    if (validateSale.value.quantity_sold < 0) {
      validateSale.errors.push('"quantity_sold" must be larger than or equal to 1');
    }
    return validateSale;
  },
  validate(sale) {
    const validateSale = {};
    validateSale.errors = [];
    validateSale.value = sale;
    this.validateProductName(validateSale);
    this.validatequantitySold(validateSale);
    return validateSale;
  },
};
export default Validation;
