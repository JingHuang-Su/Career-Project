const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //(request) Get Token from the header(curl -i http://localhost:5000/auth)
  const token = req.header('x-auth-token');

  //Check if not token, then send error (status code 401 unAuth)
  if (!token) {
    return res.status(401).json({ msg: '沒有 token, 未認證成功' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: '無效的 token' });
  }
};
