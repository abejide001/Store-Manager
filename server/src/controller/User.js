import Helper from '../helper/hashToken';
import pool from '../../db-config/database_connection';
import Validation from '../helper/user-helper';

class User {
  static async register(req, res) {
    if (!Validation.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(email, password, fullname, username, role)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.email,
      hashPassword,
      req.body.fullname,
      req.body.username,
      req.body.role,
    ];
    try {
      const { rows } = await pool.query(createQuery, values);
      const { id, email, username } = rows[0];
      const token = Helper.generateToken(id);
      return res.status(201).header('x-auth-token', token).send({ email, username });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error.message);
    }
  }

  static async login(req, res) {
    if (!Validation.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].role);
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
export default User;
