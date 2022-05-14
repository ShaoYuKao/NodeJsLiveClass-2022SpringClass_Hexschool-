// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

var express = require('express');
var router = express.Router();

const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getUser);

router.post('/login', UsersControllers.login);

module.exports = router;
