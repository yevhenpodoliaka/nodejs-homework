const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  
  const { favorite } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updateContact) {
    const error = new Error(`contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: { updateContact },
  });
};

module.exports = updateStatus;
