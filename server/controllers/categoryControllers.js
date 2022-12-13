const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json(categories);
});

const postCategory = asyncHandler(async (req, res) => {
  const { title, slug } = req.body;

  if (!title || !slug) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const newCategory = await Category.create({
    title,
    slug,
  });

  res.status(201).json(newCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCategory);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await category.remove();

  res
    .status(200)
    .json({
      message: `Category ${category.title} has been deleted`,
      id: category._id,
    });
});

module.exports = {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
