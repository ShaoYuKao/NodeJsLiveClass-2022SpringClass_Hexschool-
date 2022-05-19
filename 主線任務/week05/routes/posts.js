var express = require('express');
var router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync");
const PostsControllers = require('../controllers/posts');

router.get('/', handleErrorAsync((req, res, next) => PostsControllers.getPosts(req, res, next)));

router.post('/', handleErrorAsync((req, res, next) => PostsControllers.createPosts(req, res, next)));

router.delete('/', handleErrorAsync((req, res, next) => PostsControllers.deleteAllPosts(req, res, next)));

router.delete('/:id', handleErrorAsync((req, res, next) => PostsControllers.PostsControllers.deletePost(req, res, next)));

router.patch('/:id', handleErrorAsync((req, res, next) => PostsControllers.PostsControllers.PostsControllers.patchPosts(req, res, next)));

module.exports = router;
