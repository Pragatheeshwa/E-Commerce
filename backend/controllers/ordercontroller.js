// create order model and import that model
const orderModel = require("../models/orderModel");

//  create order - /api/v1/order
exports.PostCreateOrders = async(req,res,next) =>{
      // console.log(req.body,"Data");
       const {cartItem} = req.body;
       // reduce return a single among the array
       // previous value that is acc -- accumulated value
       // console.log(cartItem[0].product.price,"iyryytd");
       const amount = Number(cartItem.reduce((acc,item)=>(acc + item.product.price * item.qty),0)).toFixed(2);
        const status = "pending";
     //  console.log(amount,"Amount");

       const orderdata = await orderModel.create({cartItem,amount,status});


    res.json({
        success : true,
        orderdata
    })
}
