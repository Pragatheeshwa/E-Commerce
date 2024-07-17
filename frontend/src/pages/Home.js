import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";



const Home = () => {
    const [products,setproducts] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();
    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + "/products?"+ searchParams)
        .then(res => res.json())
        .then (res => setproducts(res.productsdata))
    },[searchParams])

  return (
    <>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row" >
            {products.map(product=><ProductCard 
            key={product._id}
            product={product}
            />)}
        </div>
      </section>    
    </>
  );
};

export default Home;
