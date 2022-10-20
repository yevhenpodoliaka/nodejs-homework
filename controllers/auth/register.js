const bcrypt = require("bcryptjs");
const gravatar=require("gravatar")
const { User } = require("../../models");

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error(`user with email:${email} already exist`);
    error.status = 409;
    throw error;
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL=gravatar.url(email)
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { newUser },
  });
};

module.exports = register;
