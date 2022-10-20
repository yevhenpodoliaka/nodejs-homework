const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete({ _id: contactId });
  console.log(contact)
  if (!contact) {
    const error = new Error(`contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = removeById;
