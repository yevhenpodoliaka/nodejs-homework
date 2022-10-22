const register = require("./register")
const login = require("./login");
const logout = require("./logout");
const verify = require("./verify")
const verifyPostEmail=require("./verifyPostEmail")



module.exports = {
  register,
  login,
  logout,
  verify,
  verifyPostEmail,
};