const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getMe", protect, getMe);

module.exports = router;
