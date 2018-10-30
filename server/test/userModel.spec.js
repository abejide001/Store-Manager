import chai from 'chai';
import UserModel from '../src/models/User';

const { expect } = chai;

describe('User Model', () => {
  it('should register a user', (done) => {
    (async () => {
      const user = UserModel.create({
        email: 'abejide@yahoo.com',
        fullname: 'abejide femi',
        password: 'abcd',
      });
      expect(user).to.exist;
      done();
    })();
  });
});
