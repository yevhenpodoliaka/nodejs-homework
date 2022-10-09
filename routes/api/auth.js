const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper ,auth} = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models");
const { auth: ctrl } = require("../../controllers");

router.post("/register",validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
router.post("/login",validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout",auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch("/", auth,validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription));



module.exports = router;
