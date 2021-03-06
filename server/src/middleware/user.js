export default {
  validateSignUp(req, res, next) {
    const {
      username, fullname, role, password,
    } = req.body;
    if (!username) {
      res.status(400).json({
        message: 'enter username',
      });
      return;
    }
    if (typeof username !== 'string') {
      res.status(400).json({
        message: 'Username should be a string',
      });
      return;
    }
    if (!password) {
      res.status(400).json({
        message: 'enter password',
      });
      return;
    }
    if (!fullname) {
      res.status(400).json({
        message: 'enter fullname',
      });
      return;
    }
    if (typeof fullname !== 'string') {
      res.status(400).json({
        message: 'fullname should be a string',
      });
      return;
    }
    if (!role) {
      res.status(400).json({
        message: 'enter role',
      });
      return;
    }
    if (role !== 'admin' && role !== 'user') {
      res.status(400).json({
        message: 'Role can either be admin or user',
      });
      return;
    }
    next();
  },
  validateSignin(req, res, next) {
    const { password, email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'enter email' });
    }
    if (!password) {
      res.status(400).json({ message: 'enter password' });
    }
    next();
  },
};
