const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error(`contact with email:${email} already exist`);
    error.status = 409;
    throw error;
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { newUser },
  });
};

module.exports = register;
