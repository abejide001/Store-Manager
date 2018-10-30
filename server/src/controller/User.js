import Helper from '../helper/user-helper';
import pool from '../../db-config/database_connection';
import User from '../models/User';

const User = {
  async register(req, res) {
    const user = await User.create(req.body);
  }
};
export default User;
