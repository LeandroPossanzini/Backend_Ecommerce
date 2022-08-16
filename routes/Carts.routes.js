const routerCart = require("express").Router();
const { isAdmin } = require("../handlers/isAdmin")
const { verifyToken  } = require("../middlewares/verifyToken");
const {  addProductsToCart, deleteCart, getCartByID, getAllCarts, deleteProductByid} = require('../controllers/Carts.controllers');
const { verifyCart } = require("../handlers/verifyCart");
const { verifyProduct } = require ("../handlers/verifyProducts")



routerCart
.post("/", verifyToken, verifyCart, verifyProduct , addProductsToCart)
.delete("/products/:id", verifyToken ,isAdmin, deleteCart )
.get("/:id", verifyToken, getCartByID)
.delete("/:id", verifyToken, deleteProductByid)
 //SOLO SI SOS ADMIN 
.get("/", isAdmin, getAllCarts );

module.exports = routerCart;