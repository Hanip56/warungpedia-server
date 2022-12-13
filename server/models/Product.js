const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Please add a slug"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Please add an image"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
