const bcrypt = require('bcryptjs');
const validator = require('validator');
const appError = require('../service/appError');
const handleSuccess = require('../service/handleSuccess');
const { generateSendJWT } = require('../service/auth');
const Users = require('../model/users');


const users = {
  /**
   * 註冊
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  async signUp(req, res, next) {
    try {
      const { email, password, confirmPassword, name } = req.body;

      // 內容不可為空
      if (!email || !password || !confirmPassword || !name) {
        return next(appError("400", "欄位未填寫正確！", next));
      }

      // 密碼正確
      if (password !== confirmPassword) {
        return next(appError("400", "密碼不一致！", next));
      }

      // 密碼 8 碼以上
      if (!validator.isLength(password, { min: 8 })) {
        return next(appError("400", "密碼字數低於 8 碼", next));
      }

      // 是否為 Email
      if (!validator.isEmail(email)) {
        return next(appError("400", "Email 格式不正確", next));
      }

      // 判斷 name 是否已經被註冊
      const isExist = await Users.exists({ name: name });
      if (isExist) {
        return next(appError("400", "name 已經被註冊過", next));
      }

      // 加密密碼
      const hashPwd = await bcrypt.hash(password, 12);
      const newUser = await Users.create({
        email,
        password: hashPwd,
        name
      });
      generateSendJWT(newUser, 201, res);
    } catch (err) {
      appError(400, err.message, next);
    }
  },
  /**
   * 登入
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(appError(400, '帳號密碼不可為空', next));
      }

      const user = await Users.findOne({ email }).select('+password');
      const auth = await bcrypt.compare(password, user.password);

      if (!auth) {
        return next(appError(400, '您的密碼不正確', next));
      }

      generateSendJWT(user, 200, res);
    } catch (err) {
      appError(400, err.message, next);
    }
  },
  /**
   * 取得個人資料
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getProfile(req, res, next) {
    try {
      const user = await Users.findOne({
        _id: req.user._id,
        name: req.user.name
      });

      const data = {
        name: user.name,
        photo: user.photo || null,
        email: user.email || null,
        gender: user.gender || null,
        nickname: user.nickname || null,
      };

      handleSuccess(res, data);
    } catch (err) {
      appError(400, err.message, next);
    }
  },
  /**
   * 更新個人資料
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async patchProfile(req, res, next) {
    try {
      if (!req.body) {
        handleSuccess(res);
      }

      const { photo, nickname, sex, email } = req.body;

      let result = await Users.findByIdAndUpdate(
        {
          _id: req.user._id,
          name: req.user.name
        },
        {
          photo: photo || null,
          email: email || null,
          sex: sex || null,
          nickname: nickname || null,
        },
        { 
          returnDocument: 'after' 
        }
      );

      const data = {
        name: result.name,
        photo: result.photo || null,
        email: result.email || null,
        sex: result.sex || null,
        nickname: result.nickname || null,
      };

      handleSuccess(res, data);
    } catch (err) {
      console.log("=== err ===", err);
      appError(400, err.message, next);
    }
  },
  /**
   * 重設密碼
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async updatePassword(req, res, next) {
    try {
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return next(appError("400", "密碼不一致！", next));
      }

      newPassword = await bcrypt.hash(password, 12);

      const user = await Users.findByIdAndUpdate(req.user.id, {
        password: newPassword
      });

      generateSendJWT(user, 200, res)
    } catch (err) {
      appError(400, err.message, next);
    }
  }
}

module.exports = users;