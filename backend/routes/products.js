// Create routers for the products
// before that we have to import express
const express = require("express");
const { getProducts, getsingleProduct } = require("../controllers/productscontroller");
const router = express.Router();
// instead of crating func into this get() we create the logic to the controller folder for each
router.route("/products").get(getProducts); // getproducts comes from controller folder
router.route("/products/:id").get(getsingleProduct);


// export these router

module.exports = router;