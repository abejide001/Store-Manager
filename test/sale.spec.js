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
        done(err);
      });
  });
});
describe('GET /sales/:id', () => {
  it('should return 404 if id is invalid', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${10}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done(err);
      });
  });
  it('should return a sale record if id is valid', (done) => {
    chai.request(server)
      .get(`/api/v1/sales/${1}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
});
