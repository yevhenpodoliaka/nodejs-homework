const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleValidateSchemaErrors } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type:Schema.Types.ObjectId,
      ref: "user",
      required:true
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleValidateSchemaErrors);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  favorite: Joi.bool(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  joiSchema,
  favoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
