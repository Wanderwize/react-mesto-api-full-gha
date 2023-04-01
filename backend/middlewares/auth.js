const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authoriztionError');

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
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
  return console.log('123');
};
