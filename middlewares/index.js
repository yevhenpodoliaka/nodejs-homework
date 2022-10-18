const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require("./auth");
const upload = require("./upload");
const isValidId=require("./isValidId")
module.exports = {
  validation,
  ctrlWrapper,
  auth,
  upload,
  isValidId
};
