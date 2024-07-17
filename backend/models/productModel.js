// create model for product
const mongoose = require("mongoose");
// model kuu thevaiyana mukkiyamana thing that is schema
const productSchema =new mongoose.Schema({
     name : String,
     price : String,
     description : String,
     ratings : String,
     images : [
        {
            image : String
        }
     ],
     category :String,
     seller : String,
     stock : String,
     numOfReviews : String,
     createdAt : Date
});

const productModel =mongoose.model("Product",productSchema);
module.exports = productModel;

// then create order model
