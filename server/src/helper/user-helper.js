import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Validation = {
  validateFullName(validateUser) {
    if (!validateUser.value.fullname) {
      validateUser.errors.push('"fullname" is required');
      return validateUser;
    }
    if (validateUser.value.fullname.length < 5) {
      validateUser.errors.push('"fullname" length must be at least 5 characters long');
    }
    if (validateUser.value.fullname.length > 15) {
      validateUser.errors.push('"fullname" length must be at most 15 characters long');
    }
    return validateUser;
  },
  validateEmail(validateUser) {
    if (!validateUser.value.email) {
      validateUser.errors.push('"email" is required');
      return validateUser;
    }
    if (validateUser.value.email.length < 10) {
      validateUser.errors.push('"email" must be greater than 10');
    }
    return validateUser;
  },
  validate(user) {
    const validateUser = {};
    validateUser.errors = [];
    validateUser.value = user;
    this.validateFullName(validateUser);
    this.validateEmail(validateUser);
    return validateUser;
  },
};

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' },
    );
    return token;
  },
};
export default Helper;
