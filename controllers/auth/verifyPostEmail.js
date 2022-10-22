const { User } = require("../../models");
const { mailSender } = require("../../helpers");

const { HOST = "http://localhost:3333" } = process.env;

const verifyPostEmail = async (req, res) => {
    const{email}=req.body
    const user = await User.findOne(email)
    if (!user) {
         const error = new Error("User not Found");
         error.status = 404;
         throw error;
    }
    if (user.verify) {
             const error = new Error("User already verify");
             error.status = 400;
             throw error; 
    }
      const mail = {
        to: email,
        subject: "Site registration confirmation",
        html: `<a href="${HOST}/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm email</a>`,
      };
    await mailSender(mail);
    res.json({
      message: "Verification email sent",
    });

};

module.exports = verifyPostEmail;
