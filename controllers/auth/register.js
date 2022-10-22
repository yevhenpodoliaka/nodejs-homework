const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { User } = require("../../models");
const { mailSender } = require("../../helpers");

const { HOST = "http://localhost:3333" } = process.env;

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error(`user with email:${email} already exist`);
    error.status = 409;
    throw error;
  }
  const hashedPassword =await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Site registration confirmation",
    html: `<a href="${HOST}/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await mailSender(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { newUser },
  });
};

module.exports = register;
