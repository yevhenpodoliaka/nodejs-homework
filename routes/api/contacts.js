const express = require("express");
const router = express.Router();
const {
  validation,
  ctrlWrapper,
  auth,
  isValidId,
} = require("../../middlewares");
const { joiContactSchema, joiFavoriteSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId",auth, isValidId, ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(joiContactSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId",auth, isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
