const router = require('express').Router();
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const signin = require('./signin');
const signup = require('./signup');

router.use(signin);
router.use(signup);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
