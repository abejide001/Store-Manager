import Helper from '../helper/hashToken';
import User from '../models/User';

const Users = {
  async register(req, res) {
    const users = await User.create(req.body);
    const token = Helper.generateToken(users[0].id);
    return res.header('x-auth-token', token).status(201).send(users);
  },
};
export default Users;
