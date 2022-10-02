const contactsOperation = require("../../models/contacts");

const add = async (req, res, next) => {
  const contact = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { contact },
  });
};

module.exports = add;
