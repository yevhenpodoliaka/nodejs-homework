const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth} = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiVerifyEmailSchema
} = require("../../models");
const { auth: ctrl } = require("../../controllers");


router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/verify/:verificationToken",  ctrlWrapper(ctrl.verify));
router.post("/verify",validation(joiVerifyEmailSchema), ctrlWrapper(ctrl.verifyPostEmail));


module.exports = router;
