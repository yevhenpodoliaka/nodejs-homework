const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error(`Email or password is wrong"`);
    error.status = 401;
    throw error;
  }
  const passwordCompare =await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    const error = new Error(`Email or password is wrong"`);
    error.status = 401;
    throw error;
  }
  if (!user.verify) {
    const error = new Error("User not verify");
    error.status = 400;
    throw error;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",
    code: 200,
    data: { token },
  });
};
module.exports = login;
