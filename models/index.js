const { Contact, joiContactSchema, joiFavoriteSchema } = require("./contact");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("./user");
module.exports = {
  Contact,
  joiContactSchema,
  joiFavoriteSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};
