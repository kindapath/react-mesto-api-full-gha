const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const cors = require('cors')
const app = express();

const { PORT = 30000 } = process.env;

const { errorHandler } = require('./errors/errorHandler');



mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

const allowedCors = [
  'https://kindaboii.nomoredomains.monster/',
  'http://kindaboii.nomoredomains.monster/',
  'http://localhost:3000',
  'http://localhost:3001',

];

app.options('*', cors())

app.use(cors({
  origin: '*',
  credentials: true,
  exposedHEaders: ['set-cookie']
}))

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});


app.use(routes);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => { });
