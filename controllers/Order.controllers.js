const Order = require("../models/Order");
const Cart = require('../models/Cart')
const sendEmail = require("./../mail/order")
const User = require("./../models/User")
//CREAR ORDER

async function createOrder(req, res){
    const populate = { 
        path: 'products.productId'
    }
  const cartID = req.params.cartID
  const address = req.body.address
  const cart = await Cart.findOne({_id: cartID}).populate(populate)
  let email = "";
  User.findOne({_id:cart.idUser}).then(u => email = u.email).catch(e => console.log(e))

  console.log(email)
  let total=0 
  cart.products.forEach(p=> total = total +( p.quantity* p.productId.price))
const order = {
        userId: cart.idUser,
        products: cart.products,
        amount: total,
        address: address
    }
    Order.create(order)
    .then(o=> {
      sendEmail.sendEmail(email, o)
      res.json({msg:"Orden creada correctamente", order:o})})
    .catch(e=>res.json({msg: e.message}))

}

//OBTENER LA ORDEN POR ID
function getOrderByID(req, res){
       Order.findOne({ userId: req.params.userId })
       .then(o=> res.status(200).json(o))
       .catch(e=>res.json({msg: e.message}))
     
    }
//ACTUALIZAR ORDER

function updateOrder(req, res) {
     Order.findByIdAndUpdate(
          {_id: req.params.id},
          {
            $set: req.body,
          },
          { new: true }
        )
        .then(_o=>res.status(200).json({msg:"orden Actualizada con exito"}))
        .catch(e=>res.json({msg: e.message}))
    }
//BORRAR ORDEN POR ID 
function deleteOrder(req, res){
    Order.findByIdAndDelete({_id:req.params.id})
    .then(_o=>res.status(200).json({msg:"La Order fue cancelada..."}))
    .catch(e=>res.json({msg: e.message}))
  }


  //OBTENER TODOS LAS ORDENES



  function getAllOrders(req, res){
    Order.find()
     .then(o=>res.status(200).json(o))
     .catch(e=>res.json({msg: e.message}))
  }
module.exports = {
    createOrder,
    getOrderByID,
    updateOrder,
    deleteOrder,
    getAllOrders
}