import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import SaleModel from '../src/models/Sale';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /sales', () => {
  it('should return 400 if no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.exist;
        expect(res.body.message).to.equal('Token is not provided');
        done(err);
      });
  });
});
describe('GET /sales/:id', () => {
  it('should return 400 if no token is provided', (done) => {
    (async () => {
      await SaleModel.create(
        { product_name: 'air max', quantity_sold: 3 },
      );
      const persistedSale = await SaleModel.findAll();
      const count = persistedSale.value.length - 1;
      const id = persistedSale.value[count].id + 100;
      chai.request(server)
        .get(`/api/v1/sales/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.message).to.equal('Token is not provided');
          expect(res.body).to.not.be.empty;
          done(err);
        });
    })();
  });
  it('should return 400 if no token, but valid id', (done) => {
    (async () => {
      await SaleModel.create(
        { product_name: 'air max', quantity_sold: 3 },
      );
      chai.request(server)
        .get('/api/v1/sales/1')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.exist;
          done(err);
        });
    })();
  });
});
describe('POST /sales', () => {
  it('should return 400 if empty input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  });
  it('should return 400 if valid input is passed, but no token', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        product_name: 'air max',
        quantity_sold: 10,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.exist;
        done();
      });
  });
});
