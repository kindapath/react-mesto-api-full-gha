const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');
const { corsHandler } = require('../middlewares/cors');

router.use(corsHandler)

router.post('/signup', corsHandler, validateCreateUser, createUser);

router.post('/signin', corsHandler, validateLogin, login);

router.use('/users', corsHandler, auth, routerUsers);

router.use('/cards', corsHandler, auth, routerCards);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('*', () => {
  throw new NotFoundError('Некорректный путь или запрос.');
});

module.exports = router;
