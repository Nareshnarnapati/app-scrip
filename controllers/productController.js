const productModel = require("../models/productModel");

const createProducts = async (req, res) => {
  try {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const data = await response.json();

    const productsToInsert = data.map((product) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count,
      },
    }));

    const insertedProducts = await productModel.insertMany(productsToInsert);

    return res.status(201).send(insertedProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    return res.status(200).send({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { sortByPrice, sortByCategory, findByTitle } = req.query;
    let filter = [];
    if (sortByPrice) {
      filter.push({ $sort: { price: sortByPrice === "asc" ? 1 : -1 } });
    }
    if (sortByCategory) {
      filter.push({ $sort: { category: sortByCategory === "asc" ? 1 : -1 } });
    }
    if (findByTitle) {
      filter.push({
        $match: {
          title: { $regex: findByTitle, $options: "i" },
        },
      });
    }
    if (filter.length === 0) {
      const filters = await productModel.find();
      return res.status(200).send(filters);
    }

    const filterProduct = await productModel.aggregate(filter);
    return res.status(200).send(filterProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
module.exports = { createProducts, getAllProducts, filterProducts };