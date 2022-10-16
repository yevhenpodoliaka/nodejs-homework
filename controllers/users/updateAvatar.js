const path = require("path")
const fs=require("fs/promises")
const { User } = require("../../models");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const avatarName= `${_id}_${originalname}`
  
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    const updateUser = await User.updateOne(
      { _id },
      { avatarURL },
      { runValidators: true }
    );
     res.json({
       status: "success",
       code: 200,
       data: { avatarURL },
     });
    if (!updateUser) {
      const error = new Error(`user with id=${_id} not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    await fs.unlink()
    error.status = 400;
    throw error;
  }

 
};

module.exports = updateAvatar;
