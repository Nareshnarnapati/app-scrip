const productController = require("../controllers/productController");
const { Router } = require("express");
const productRouter = Router();

productRouter.get("/getProducts", productController.createProducts);
productRouter.get("/getAllProducts", productController.getAllProducts);
productRouter.get("/filter", productController.filterProducts);

module.exports = productRouter;