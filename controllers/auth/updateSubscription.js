const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id, name, email } = req.user;
  const { subscription } = req.body;
  try {
    const updateUser = await User.updateOne(
      { _id },
      { subscription },
      { runValidators: true }
    );
    if (!updateUser) {
      const error = new Error(`user with id=${_id} not found`);
      error.status = 404;
      throw error;
    }
  } catch (error) {
    error.status = 400;
    throw error;
  }

  res.json({
    status: "success",
    code: 200,
    data: { name, email, subscription },
  });
};

module.exports = updateSubscription;
