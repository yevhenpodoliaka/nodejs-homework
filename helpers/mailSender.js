const nodemailer = require("nodemailer");

require("dotenv").config();

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "mail_auth@ukr.net",
    pass: process.env.PASSWORD_UKR_NET,
  },
};

const transporter = nodemailer.createTransport(config);

const mailSender = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "mail_auth@ukr.net" };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = mailSender;
