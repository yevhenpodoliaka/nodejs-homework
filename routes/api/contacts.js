const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper,auth } = require("../../middlewares");
const { schemas } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

router.get("/",auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/",auth ,validation(schemas.joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validation(schemas.joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validation(schemas.favoriteSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
