const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiRegisterSchema,joiLoginSchema } = require("../../models");
const { auth: ctrl } = require("../../controllers");

router.post("/register",validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
router.post("/login",validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", ctrlWrapper(ctrl.logout));



module.exports = router;
