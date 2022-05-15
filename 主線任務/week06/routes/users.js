const express = require('express');
const handleErrorAsync = require('../service/handleErrorAsync');
const { isAuth } = require('../service/auth');
const UsersControllers = require('../controllers/users');

const router = express.Router();

// 註冊
router.post('/sign_up', handleErrorAsync((req, res, next) => UsersControllers.signUp(req, res, next)));

// 登入
router.post('/sign_in', handleErrorAsync((req, res, next) => UsersControllers.signIn(req, res, next)));

// 重設密碼
router.post('/updatePassword', isAuth, handleErrorAsync((req, res, next) => UsersControllers.updatePassword(req, res, next)));

// 取得個人資料
router.get('/profile', isAuth, handleErrorAsync((req, res, next) => UsersControllers.getProfile(req, res, next)));

// 更新個人資料
router.patch('/profile', isAuth, handleErrorAsync((req, res, next) => UsersControllers.patchProfile(req, res, next)));

module.exports = router;
