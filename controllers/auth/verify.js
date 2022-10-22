const { User } = require("../../models");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken:""});
    res.json({
      message: "Verification successful",
    });
};;

module.exports = verify;
