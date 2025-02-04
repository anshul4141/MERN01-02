const express = require('express');
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');
const formidable = require('express-formidable');
const { addProduct, getProduct, searchProduct, deleteProduct, productPhoto, updateProduct, productCount, productList, searchProductController, productCategoryController } = require('../services/productService');

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable(), addProduct);

router.get("/get-product", getProduct);

router.get("/get-product/:slug", searchProduct);

router.get("/product-photo/:pid", productPhoto);

router.delete("/delete-product/:pid", deleteProduct);

router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProduct);

router.get("/product-count", productCount);

router.get("/product-list/:page", productList);

router.get('/search/:keyword', searchProductController);

router.get('/product-category/:slug', productCategoryController);

module.exports = router;