const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authoriztionError');

<<<<<<< HEAD
=======
const { NODE_ENV, JWT_SECRET } = process.env;
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
const handleAuthError = () => {
  throw new AuthorizationError('Неправильные почта или пароль');
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
<<<<<<< HEAD
    payload = jwt.verify(token, 'super-strong-secret');
=======
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
  return console.log('123');
};
