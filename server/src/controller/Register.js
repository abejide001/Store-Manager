import Helper from '../helper/user-helper';
import pool from '../../db-config/database_connection';

const User = {
  async register(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(fullname, username, email, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.fullname,
      req.body.email,
      req.body.username,
      hashPassword,
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(error.message);
    }
  },
};
export default User;
