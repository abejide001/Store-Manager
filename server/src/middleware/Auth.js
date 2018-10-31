import jwt from 'jsonwebtoken';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      res.status(400).send({ message: 'Token is not provided' });
      return;
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  verifyAdmin(req, res, next) {
    if (req.user.userId !== 'admin') {
      res.status(401).send('unauthorized');
      return;
    }
    next();
  },
};
export default Auth;
