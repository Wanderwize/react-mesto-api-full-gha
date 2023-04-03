const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authoriztionError');

const handleAuthError = () => {
  throw new AuthorizationError('Требуется авторизация');
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
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'dev-secret',
    );
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
  return console.log('123');
};
