import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
function App() {
  const [cartItem, setCartItem] = useState([]);

  return (
    <div className="App">
      <Router>
        <div>
          <ToastContainer theme="dark "
          autoClose={2000}
          position="top-center"
          />
          <Header cartItem={cartItem} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route
              path="/products/:id"
              element={
                <ProductDetail cartItem={cartItem} setCartItem={setCartItem} />
              }
            />
            <Route path="/cart" element={<Cart cartItem = {cartItem} setCartItem={setCartItem} /> } />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
