// product model create pannadhukrpm next
// create model for order

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    cartItem : Array,
    amount : String,
    status : String,
    createdAt : Date
})
const orderModel = mongoose.model("Order",orderSchema);
module.exports = orderModel;