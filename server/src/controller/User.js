import Helper from '../helper/hashToken';
import pool from '../../db-config/database_connection';
import Validation from '../helper/user-helper';

class User {
  static async register(req, res) {
    if (!Validation.isValidEmail(req.body.email)) {
      return res.status(400).json({ status: 'error', message: 'Please enter a valid email address' });
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
      return res.status(201).header('x-auth-token', token).json({ status: 'success', email, username });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ status: 'error', message: 'User with that EMAIL already exist' });
      }
      return res.status(400).json(error.message);
    }
  }

  static async login(req, res) {
    if (!Validation.isValidEmail(req.body.email)) {
      return res.status(400).json({ status: 'error', message: 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].role);
      return res.status(200).json({ status: 'success', message: 'successfully logged in', token });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async editUser(req, res) {
    const { id } = req.params;
    const userId = 'SELECT * FROM users WHERE id=$1';
    const { rows } = await pool.query(userId, [id]);
    if (!rows[0]) return res.status(404).json({ status: 'error', message: 'id not found' });
    const hashPassword = Helper.hashPassword(req.body.password);
    const user = await pool.query(
      'UPDATE users SET fullname=($1), username=($2), hashPassword=($3), role=($4) WHERE id=($5) RETURNING *',
      [id, req.body.fullname, req.body.username, req.body.role, hashPassword],
    );
    const { role, email } = user.rows[0];
    return res.status(200).json({ status: 'success', role, email });
  }
}
export default User;
