import React, { useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const Cart = ({ cartItem, setCartItem }) => {
    // placeorder
    const [complete,setComplete] = useState(false);
    const incrementcount = (item)=>{
        if (item.product.stock == item.qty){
         return
        }
       const increment = cartItem.map((i)=>{
          if (i.product._id == item.product._id){
            i.qty++
          }
          return i;
       })
       setCartItem(increment)
    }
     const decrementcount = (item) =>{
        if (item.qty > 1){
            const decrement = cartItem.map((i)=>{
                if (i.product._id == item.product._id){
                    i.qty--
                  }
                  return i;
            })
            setCartItem(decrement)
        }
 
  }
const deleteCartItem =(item)=>{
    const deleteItems = cartItem.filter((i)=>{
        if (i.product._id !== item.product._id){
            return true;
          }
          
    })
    setCartItem(deleteItems)
}

const placeOrderHandler = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, 
    {
      cartItem
    }, 
    {
      headers: {'Content-Type': 'application/json'}
    });

    if (response.status === 200 || response.status === 201) {
      setCartItem([]);
      setComplete(true);
      toast.success('Order Success!');
    } else {
      toast.error('Order Failed!');
    }
  } catch (error) {
    toast.error('Order Failed! ' + error.message);
  }
};



  return cartItem.length >0 ? <>
    <div className="container container-fluid">
      <h2 className="mt-5">
        Your Cart: <b>{cartItem.length}</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
            {cartItem.map((items)=>(
            <>
          <hr />
          <div  className="cart-item">
            <div className="row">
              <div   key={items.product._id} className="col-4 col-lg-3">
                <img
                
                  src={items.product.images[0].image}
                  alt={items.product.name}
                  height="90"
                  width="115"
                />
              </div>

              <div className="col-5 col-lg-3">
                <Link to={'/products/'+ items.product._id}>
                 {items.product.name}
                </Link>
                
              </div>

              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p id="card_item_price">Rs. {items.product.price}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus"
                  onClick={()=>decrementcount(items)}
                  >-</span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={items.qty}
                    readOnly
                  />

                  <span className="btn btn-primary plus"
                  onClick={()=> incrementcount(items)}
                  >+</span>
                </div>
              </div>

              <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                <i
                  id="delete_cart_item"
                  className="fa fa-trash btn btn-danger"
                  onClick={()=>deleteCartItem(items)}
                ></i>
              </div>
            </div>
          </div>
            </>)
            )}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">{cartItem.reduce((acc,items)=>(acc + items.qty),0)} (Units)</span>
            </p>
            <p>
              Est. total: <span className="order-summary-values">Rs. {cartItem.reduce((acc,items)=>(acc + items.product.price * items.qty),0)}</span>
            </p>

            <hr />
            <button id="checkout_btn"
            onClick={placeOrderHandler}
            className="btn btn-primary btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  
  </> : (!complete ? <h1 className="mt-5">Your Cart is Empty</h1>
      : <> <h1 className="mt-5">Order Completed!</h1><p>Your Order has been placed successfully..!</p> </>)
};

export default Cart;
