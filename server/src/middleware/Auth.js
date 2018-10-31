import jwt from 'jsonwebtoken';
import pool from '../../db-config/database_connection';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(400).send({ message: 'Token is not provided' });
      return;
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await pool.query(text, [decoded.userId]);
      if (!rows[0]) {
        res.status(400).send({ message: 'The token you provided is invalid' });
        return;
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
export default Auth;
