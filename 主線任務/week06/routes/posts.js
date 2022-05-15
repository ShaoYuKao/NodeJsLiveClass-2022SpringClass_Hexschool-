var express = require('express');
var router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync");
const { isAuth } = require('../service/auth');
const PostsControllers = require('../controllers/posts');

// 觀看所有動態
router.get('/', isAuth, handleErrorAsync((req, res, next) => PostsControllers.getPosts(req, res, next)));

// 張貼個人動態
router.post('/', isAuth, handleErrorAsync((req, res, next) => PostsControllers.createPosts(req, res, next)));

module.exports = router;
