<<<<<<< HEAD
const app = require("./app.js");
=======
const app = require('./app');

>>>>>>> 12fd8cffa1e5ac82fc3fb9ba246e47e6cddc2216
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT} порт`);
});
