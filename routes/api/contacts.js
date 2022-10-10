const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper,auth } = require("../../middlewares");
const { joiContactSchema, joiFavoriteSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

router.get("/",auth, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", auth, validation(joiContactSchema), ctrlWrapper(ctrl.add));
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));
router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteSchema),
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
