import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// toastify
import {toast} from 'react-toastify'


const ProductDetail = ({cartItem,setCartItem}) => {
    const [product,setProduct] = useState();
    const {id} = useParams();
    const [qty,setqty] = useState(1);
 
    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + "/products/"+ id)
        .then(res => res.json())
        .then (res => setProduct(res.productdata))
    },[])


   const addToCart = () =>{
    const item_exist = cartItem.find((item)=>item.product._id == product._id)
    if(!item_exist){
      const newItem = {product , qty}
      setCartItem((prevstate) =>[...prevstate,newItem])
      toast.success('🛒 Cart Item Added Successfully!')
    }
   }
   const incrementcount = ()=>{
       if (product.stock == qty){
        return
       }
       setqty((prevstate)=>prevstate + 1)
   }
   const decrementcount = ()=>{
    setqty((prevstate)=>prevstate >= 2 ? prevstate - 1 : prevstate);

}
   


  return (
    
      product ? (<div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product #{product._id}</p>

            <hr />

            <div className="rating-outer">
              <div className="rating-inner" 
              style={{width : `${product.ratings/5 * 100}%`}}
              ></div>
            </div>

            <hr />

            <p id="product_price">Rs. {product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus"
              onClick={decrementcount}
              >-</span>

              <input
                type="number"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={incrementcount}>+</span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={product.stock == 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status: <span id="stock_status" className={product.stock > 0 ?'text-success' : 'text-danger'}>{product.stock > 0?'In Stock' : 'Out of Stock'}</span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>
              {product.description}
            </p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div> ): ""
    
  );
};

export default ProductDetail;
