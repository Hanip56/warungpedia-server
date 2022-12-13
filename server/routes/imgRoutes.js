const uploadImg = require("../utils/uploadImg");
const multer = require("multer");

const router = require("express").Router();

router.post("/", (req, res, next) => {
  uploadImg(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      res.status(400);
      return next(new Error(err.message, 400));
    }

    if (req.files === undefined) {
      res.status(400);
      return next(new Error("Error no file selected", 400));
      // An unknown error occurred when uploading.
    }
    console.log(req.files);

    res.status(200).json({ message: "uploaded" });
  });
});

module.exports = router;
