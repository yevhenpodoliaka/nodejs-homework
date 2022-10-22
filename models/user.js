const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 3,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required:true
    },
    token: {
      type: String,
      default: null,
    },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },

  },
  { versionKey: false, timestamps: true }
);

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
});

const joiRegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});
const joiVerifyEmailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
};
