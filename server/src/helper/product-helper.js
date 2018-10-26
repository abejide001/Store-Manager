const Validation = {
  validateName(validatedProduct) {
    if (!validatedProduct.value.name) {
      validatedProduct.errors.push('"name" is required');
      return validatedProduct;
    }
    if (validatedProduct.value.name.length < 5) {
      validatedProduct.errors.push('"name" length must be at least 5 characters long');
    }
    if (validatedProduct.value.name.length > 15) {
      validatedProduct.errors.push('"name" length must be at most 15 characters long');
    }
    return validatedProduct;
  },
  validatePrice(validatedProduct) {
    if (!validatedProduct.value.price) {
      validatedProduct.errors.push('"price" is required');
      return validatedProduct;
    }
    if (validatedProduct.value.price < 1) {
      validatedProduct.errors.push('"price" must be larger than or equal to 1000');
    }
    return validatedProduct;
  },
  validateQuantityInInventory(validatedProduct) {
    if (!validatedProduct.value.quantityInInventory) {
      validatedProduct.errors.push('"quantityInInventory" is required');
      return validatedProduct;
    }
    if (validatedProduct.value.quantityInInventory < 1) {
      validatedProduct.errors.push('"quantityInInventory" cannot be less than 1');
    }
    return validatedProduct;
  },
  validate(product) {
    const validatedProduct = {};
    validatedProduct.errors = [];
    validatedProduct.value = product;
    this.validateName(validatedProduct);
    this.validatePrice(validatedProduct);
    this.validateQuantityInInventory(validatedProduct);
    return validatedProduct;
  },
};
export default Validation;
