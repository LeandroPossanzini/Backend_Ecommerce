const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");
const routerOrder = require("express").Router();
const {createOrder, getOrderByID, updateOrder, deleteOrder, getAllOrders}=require('../controllers/Order.controllers')



routerOrder
.post("/:cartID", verifyToken, createOrder )
.get("/find/:userId", verifyToken, getOrderByID )
// SI SOS ADMIN
.put("/:id", isAdmin, updateOrder )
.delete("/:id",  isAdmin , deleteOrder )
.get("/", isAdmin, getAllOrders )

module.exports = routerOrder;