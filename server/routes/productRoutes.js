const router = require("express").Router();
const {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productControllers");

router.route("/").get(getProduct).post(postProduct);

router.route("/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;
