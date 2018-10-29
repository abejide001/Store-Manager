import Helper from '../helper/user-helper';
import pool from '../../db-config/database_connection';
import Register from '../models/Register';

const User = {
  async register(req, res) {
    const user = await Register.create(req.body);
}
};
export default User;
