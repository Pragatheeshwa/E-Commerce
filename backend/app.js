// install express and import path,env file 
const express = require("express"); 
const app = express();
const dotenv = require("dotenv");
const path = require("path");
// import cors because it returns header "Access-control-Allow-Origin" while api hitting and interaction between frontend and backend
const cors = require("cors");
dotenv.config({path: path.join(__dirname,"config",".env")})
//import ConnectDB here
const connectdatabase = require("./config/connectDB");

// creating routers step 2
// import Routers into this app.js
const products = require("./routes/products");
const orders = require("./routes/orders");


// we call database here
connectdatabase();
// create models for products which is collections
// for sending json data so we use middle ware here

app.use(express.json()) 
// cors call
app.use(cors());

// we set prefix URL
app.use("/api/v1/",products);
app.use("/api/v1/",orders);
// api check in thunder client
// then create database

app.listen(process.env.PORT,()=>{
    console.log(`Server Listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
