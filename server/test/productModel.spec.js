import chai from 'chai';
import ProductModel from '../src/models/Product';

const { expect } = chai;

describe('Product Model', () => {
  describe('findAll', () => {
    it('should retrieve products', (done) => {
      (async () => {
        const product = await ProductModel.create(
          { name: 'fila jordan', price: 50000, quantity_in_inventory: 3 },
        );
        const persistedProducts = await ProductModel.findAll();
        expect(persistedProducts.errors).to.be.empty;
        expect(persistedProducts.value).to.not.be.empty;
        const persistedProduct = persistedProducts
          .value
          .find(pProduct => pProduct.id === product.value.id);
        expect(persistedProduct.name).to.equal('fila jordan');
        expect(persistedProduct.price).to.equal(50000);
        expect(persistedProduct.quantity_in_inventory).to.equal(3);
        done();
      })();
    });
  });
  describe('updateProduct', () => {
    it('should update the product name', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'nike ordan', price: 700, quantity_in_inventory: 5 },
          );
          const updatedProduct = await ProductModel.update(product.value.id, { name: 'nike jordan' });
          expect(updatedProduct.errors.length).to.equal(0);
          expect(updatedProduct.value.id).to.equal(product.value.id);
          expect(updatedProduct.value.name).to.equal('nike jordan');
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should update the product price', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'nike jordan', price: 750, quantity_in_inventory: 5 },
          );
          const updatedProduct = await ProductModel.update(product.value.id, { price: 800 });
          expect(updatedProduct.errors.length).to.equal(0);
          expect(updatedProduct.value.id).to.equal(product.value.id);
          expect(updatedProduct.value.price).to.equal(800);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should update the product quantity_in_inventory', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'nike jordan', price: 750, quantity_in_inventory: 5 },
          );
          const updatedProduct = await ProductModel
            .update(product.value.id, { quantity_in_inventory: 10 });
          expect(updatedProduct.errors.length).to.equal(0);
          expect(updatedProduct.value.id).to.equal(product.value.id);
          expect(updatedProduct.value.quantity_in_inventory).to.equal(10);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should not update the product id', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'nike jordan', price: 750, quantity_in_inventory: 5 },
          );
          const updatedProduct = await ProductModel.update(product.value.id, { id: 1000 });
          expect(updatedProduct.errors.length).to.be.greaterThan(0);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should return errors for an invalid price update', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
          );
          const updatedProduct = await ProductModel.update(product.value.id, { price: 0 });
          expect(updatedProduct.errors.length).to.be.greaterThan(0);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should return errors for an invalid name update', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
          );
          const updatedProduct = await ProductModel.update(product.value.id, { name: 'same' });
          expect(updatedProduct.errors.length).to.be.greaterThan(0);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should return errors for an invalid quantity_in_inventory update', (done) => {
      (async () => {
        try {
          const product = await ProductModel.create(
            { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
          );
          const updatedProduct = await ProductModel
            .update(product.value.id, { quantity_in_inventory: 0 });
          expect(updatedProduct.errors.length).to.be.greaterThan(0);
          done();
        } catch (err) {
          done(err);
        }
      })();
    });

    it('should return errors for a non existing product', (done) => {
      (async () => {
        try {
          await ProductModel.create(
            { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
          );
          const persistedProducts = await ProductModel.findAll();
          const count = persistedProducts.value.length - 1;
          const id = persistedProducts.value[count].id + 100;
          const updatedProduct = await ProductModel.update(id, { name: 'some other shoe' });
          expect(updatedProduct.errors.length).to.be.greaterThan(0);
          expect(updatedProduct.value).to.not.exist;
          done();
        } catch (err) {
          done(err);
        }
      })();
    });
  });

  describe('createProduct', () => {
    it('should persist the product', (done) => {
      (async () => {
        const product = await ProductModel.create(
          { name: 'nike jordan', price: 10000, quantity_in_inventory: 2 },
        );
        expect(product.errors.length).to.equal(0);
        expect(product.value.id).to.be.greaterThan(0); // means we created the entry
        done();
      })();
    });
    it('should not return errors for a valid product', (done) => {
      (async () => {
        const product = await ProductModel.create({
          name: 'nike jordan',
          price: 1000,
          quantity_in_inventory: 2,
        });
        if (product.errors.length > 0) {
          done(new Error(product.errors));
        }
        expect(product.errors).to.be.empty;
        done();
      })();
    });
    it('should return errors for an invalid product name', (done) => {
      (async () => {
        const product = await ProductModel.create({
          name: 'n',
          price: 5000,
          quantity_in_inventory: 2,
        });
        expect(product.errors).to.not.be.empty;
        expect(product.errors.length).to.equal(1);
        expect(product.errors[0]).to.equal('"name" length must be at least 5 characters long');
        done();
      })();
    });
    it('should return errors for an invalid product amount', (done) => {
      (async () => {
        const product = await ProductModel.create({
          name: 'air storm',
          price: 0,
          quantity_in_inventory: 2,
        });
        expect(product.errors).to.not.be.empty;
        expect(product.errors.length).to.equal(1);
        expect(product.errors[0]).to.equal('"price" must be larger than or equal to 1');
        done();
      })();
    });
  });
});
describe('Delete product model', () => {
  it('should ensure a product is deleted', (done) => {
    (async () => {
      try {
        const product = await ProductModel.create(
          { name: 'some shoe', price: 50000, quantity_in_inventory: 3 },
        );
        const deleteProduct = await ProductModel.deleteOne(product.value.id);
        expect(deleteProduct.errors).to.be.empty;
        done();
      } catch (err) {
        done(err);
      }
    })();
  });
});
