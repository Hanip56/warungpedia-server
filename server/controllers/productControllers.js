const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const uploadImg = require("../utils/uploadImg");
const multer = require("multer");
const fsPromises = require("fs").promises;

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const postProduct = asyncHandler(async (req, res, next) => {
  uploadImg(req, res, async function (err) {
    if (err instanceof multer.MulterError || err) {
      res.status(400);
      return next(new Error(err.message, 400));
    }

    if (req.file === undefined) {
      res.status(400);
      return next(new Error("Error no file selected", 400));
      // An unknown error occurred when uploading.
    }

    try {
      const { title, slug, category, price, description } = req.body;

      if (!title || !slug || !category || !price) {
        res.status(400);
        throw new Error("Please add all fields");
      }

      const product = await Product.create({
        title,
        slug,
        image: req.file.filename,
        category,
        price,
        description: description ? description : "",
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(req.file);
      await fsPromises.unlink(req.file.path);
      res.status(500);
      return next(new Error(error.message));
    }
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("product not found");
  }
  try {
    await fsPromises.unlink("./server/public/" + product.image);
    await product.remove();
    res.status(200).json({
      message: `Product with id ${product._id} has been deleted`,
      id: product._id,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
};
