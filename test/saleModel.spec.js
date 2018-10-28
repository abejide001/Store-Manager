import chai from 'chai';
import SaleModel from '../server/src/models/Sale';

const { expect } = chai;

describe('Sale Model', () => {
  describe('find one', () => {
    it('should retrieve a persisted sale', (done) => {
      (async () => {
        const sale = await SaleModel.create(
          { product_name: 'fila jordan', quantity_sold: 3 },
        );
        const persistedSale = await SaleModel.findOne(sale.value.id);
        expect(persistedSale.errors).to.be.empty;
        expect(persistedSale.value).to.not.be.empty;
        expect(persistedSale.value.product_name).to.equal('fila jordan');
        expect(persistedSale.value.quantity_sold).to.equal(3);
        done();
      })();
    });
  });
  describe('find all', () => {
    it('should retrieve sales', (done) => {
      (async () => {
        const sale = await SaleModel.create(
          { product_name: 'fila jordan', quantity_sold: 3 },
        );
        const persistedSales = await SaleModel.findAll();
        expect(persistedSales.errors).to.be.empty;
        expect(persistedSales.value).to.not.be.empty;
        const persistedSale = persistedSales.value.find(pSale => pSale.id === sale.value.id);
        expect(persistedSale.product_name).to.equal('fila jordan');
        expect(persistedSale.quantity_sold).to.equal(3);
        done();
      })();
    });
  });
  describe('create', () => {
    it('should persist the sale', (done) => {
      (async () => {
        const sale = await SaleModel.create(
          { product_name: 'air max', quantity_sold: 10 },
        );
        expect(sale.errors.length).to.equal(0);
        expect(sale.value.id).to.be.greaterThan(0); // means we created the entry
        done();
      })();
    });
    it('should return errors for an invalid quantity sold', (done) => {
      (async () => {
        const product = await SaleModel.create({
          product_name: 'air max',
          quantity_sold: 0,
        });
        expect(product.errors).to.not.be.empty;
        expect(product.errors.length).to.equal(1);
        expect(product.errors[0]).to.equal('"quantity_sold" is required');
        done();
      })();
    });
    it('should return errors for an invalid product_name', (done) => {
      (async () => {
        const product = await SaleModel.create({
          product_name: 'aa',
          quantity_sold: 5,
        });
        expect(product.errors).to.not.be.empty;
        expect(product.errors.length).to.equal(1);
        expect(product.errors[0]).to.equal('"product_name" length must be at least 5 characters long');
        done();
      })();
    });
  });
});
