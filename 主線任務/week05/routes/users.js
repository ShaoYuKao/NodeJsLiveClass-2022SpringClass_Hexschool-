var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getUser);

router.post('/login', UsersControllers.login);

module.exports = router;
