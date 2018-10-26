import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /sales', () => {
  it('should return all sales records', (done) => {
    chai.request(server)
      .get('/api/v1/sales')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});
describe('GET /sales/:id', () => {
  it('should return 404 if id is invalid', (done) => {
    chai.request(server)
      .get('/api/v1/sales/10')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done(err);
      });
  });
  it('should return a sale record if id is valid', (done) => {
    chai.request(server)
      .get('/api/v1/sales/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.not.be.empty;
        done(err);
      });
  });
});
describe('POST /sales', () => {
  it('should return 400, if empty input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors).to.not.be.empty;
        done(err);
      });
  });
  it('should return an object if valid input is passed', (done) => {
    chai.request(server)
      .post('/api/v1/sales')
      .send({
        productName: 'nike jordan',
        quantitySold: 2,
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        done(err);
      });
  });
});
