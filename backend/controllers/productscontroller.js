const productModel = require("../models/productModel");



exports.getProducts = async(req,res,next) =>{

     // get search api to get products
     const query = req.query.keyword?{name : {
        $regex : req.query.keyword,
        $options : 'i'
    }} : {}
      
    const productsdata = await productModel.find(query);

    res.json({
        success : true,
        productsdata
    })
}
// Get Single Products API - /api/v1/product/:id
// Error handling
exports.getsingleProduct = async (req,res,next) =>{
      
    console.log(req.params.id,'ID');
    try{   
    const productdata = await productModel.findById(req.params.id);
    res.json({
        success : true,
        productdata
    }) 
    }catch(err){
        res.status(404).json({ 
            success : true,
            message : "Unable to get Product with that Id"
        })
    }
}
