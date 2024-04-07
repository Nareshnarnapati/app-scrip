const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    rating: {
      rate: {
        type: Number,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;