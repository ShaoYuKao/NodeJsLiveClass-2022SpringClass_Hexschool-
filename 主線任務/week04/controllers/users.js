const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Users = require('../model/users');


const users = {
  async getUser(req, res) {
    const user = {
      name: "Snoopy"
    }
    
    handleSuccess(res, user);
  },
  async login(req, res) {
    const login = {
      name: "login"
    }
    
    handleSuccess(res, login);
  },
}

module.exports = users;