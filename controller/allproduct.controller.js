// import products from "../data/realData.js";

import Product from "../models/products.schema.js";
import ExpressError from "../utils/ExpressError.js";

// const insertProducts = async (req, res) => {
//   const data = await Product.insertMany(products);
//   res.status(201).json({
//     success: true,
//     message: "Products inserted successfully",
//   });

//   res.status(500).json({
//     success: false,
//     message: "Failed to insert products",
//     error: error.message,
//   });
// };

const findCategory = async (req, res, next) => {
  const { category } = req.params;
  if (!category) {
    return next(new ExpressError(404, "category Not Found"));
  }

  const data = await Product.find({
    category,
  });
  res.json(data);
};

const detaildProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    next(new ExpressError(404, "product not found"));
  }

  next(new ExpressError(500, "server error"));
};

const allproducts = async (req, res, next) => {
  const data = await Product.find();
  res.json(data);
};

const search = async (req, res) => {
  const searchTerm = (req.query.query || "").trim();

  const products = await Product.find({
    productName: { $regex: searchTerm, $options: "i" },
  });

  res.json(products);
};

export { findCategory, detaildProduct, allproducts, search };
