import Helper from '../helper/user-helper';
import pool from '../../db-config/database_connection';

const User = {
  async create(data) {
    const hashPassword = Helper.hashPassword(data.password);
    const createQuery = `INSERT INTO
      users(fullname, username, email, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      data.fullname,
      data.email,
      data.username,
      hashPassword,
    ];

    try {
      const { rows } = await pool.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      // return res.status(201).send({ token });
      return token;
    } catch (error) {
    // if (error.routine === '_bt_check_unique') {
    //     return res.status(400).send({ message: 'User with that EMAIL already exist' });
    //   }
    //   return res.status(400).send(error.message);
      return error.message;
    }
  },
};
export default User;
