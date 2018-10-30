import Helper from '../helper/hashToken';
import pool from '../../db-config/database_connection';

const User = {
  async create(data) {
    const hashPassword = Helper.hashPassword(data.password);
    const createQuery = `INSERT INTO
      users(fullname, username, email, hash_password, role)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      data.fullname,
      data.email,
      data.username,
      hashPassword,
      data.role,
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
      return rows;
    } catch (error) {
    // if (error.routine === '_bt_check_unique') {
    //     return res.status(400).send({ message: 'User with that EMAIL already exist' });
    //   }
    //   return res.status(400).send(error.message);
      return error.message;
    }
  },
  async findOne(id) {
    try {
      const user = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
      return user.rows[0];
    } catch (error) {
      return error.message;
    }
  },
};
export default User;
