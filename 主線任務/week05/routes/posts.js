var express = require('express');
var router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync");
const PostsControllers = require('../controllers/posts');

router.get('/', handleErrorAsync((req, res, next) => PostsControllers.getPosts(req, res, next)));
router.post('/', handleErrorAsync((req, res, next) => PostsControllers.createPosts(req, res, next)));

module.exports = router;
