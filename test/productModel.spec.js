import chai from 'chai';
import ProductModel from '../server/src/models/Product';

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
        const persistedProduct = persistedProducts.value.find(pProduct => pProduct.id === product.value.id);
        expect(persistedProduct.name).to.equal('fila jordan');
        expect(persistedProduct.price).to.equal(50000);
        expect(persistedProduct.quantity_in_inventory).to.equal(3);
        done();
      })();
    });
  });
  describe('createProducts', () => {
    it('should persist the product', (done) => {
      (async () => {
        const product = await ProductModel.create(
          { name: 'nike jordan', price: 10000, quantity_in_inventory: 2 },
        );
        expect(product.errors.length).to.equal(0);
        expect(product.value.id).to.be.greaterThan(0); // means we created the entry
        done();
      })();
    }),
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
