// Create routers for the products
// before that we have to import express
const express = require("express");
const { PostCreateOrders } = require("../controllers/ordercontroller");
const router = express.Router();

// instead of crating func into this post() we create the logic to the controller folder for each
     
router.route("/orders").post(PostCreateOrders);  // postOrders() comes from controller folder


// export these router

module.exports = router;            