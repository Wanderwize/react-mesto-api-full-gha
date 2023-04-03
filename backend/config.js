const { DB_ADRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  DB_ADRESS,
  JWT_SECRET,
};
