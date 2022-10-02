const contactsOperation = require("../../models/contacts");
const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperation.removeContact(contactId);
  if (!contact) {
    const error = new Error(`contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      contact,
    },
  });
};

module.exports = removeById;
