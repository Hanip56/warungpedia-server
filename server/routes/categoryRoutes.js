const router = require("express").Router();
const {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.route("/").get(getCategory).post(postCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
