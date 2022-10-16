const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const {
  joiSubscriptionSchema,
} = require("../../models");
const { users: ctrl } = require("../../controllers");

router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);


module.exports=router
