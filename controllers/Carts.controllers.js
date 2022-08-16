const Cart = require("./../models/Cart");
const mongoose = require("mongoose");


//AGREGAR PRODUCTOS A CARRITO 
async function addProductsToCart(req, res){
  let newProduct = req.body.productId;
  const user = req.user.id
  let carrito= await Cart.findOne({idUser:user}).exec()
  if(!carrito.products.find(e=> e.productId == newProduct)){
  newProduct= {productId: newProduct} 
  carrito.products.push(newProduct)
  }else{
 
  carrito.products.forEach(element => {
      if(element.productId == newProduct) element.quantity= element.quantity +1
 })
  }
  carrito.save()
  .then(_cart=> res.json({msg:"Se Agrego el producto al carrito"}))
  .catch(err=> res.json({msg: err.message}))
  
}
//BORRAR CARRITO POR ID 
function deleteCart(req, res) {
    Cart.findByIdAndDelete({idCart:req.params.id})
    .then(_cart =>res.status(200).json("El carrito fue eliminado exitosamente..."))
    .catch(e=> res.status(500).json({msg:e.message})) ;
  }

  
  //OBTENER EL CARRITO POR ID DE CARRITO con productos
function getCartByID(req, res) {
  const id = req.params.id
  Cart.find({ idCart:id })
  .then(cart => res.status(200).json(cart))
  .catch(e=>res.status(500).json({msg:e.message}))
}

//se elimina producto con id de producto
async function deleteProductByid(req, res){
  const id = req.params.id
  const product = req.body.productId
  let cart = await Cart.findOne({_id:id})
  cart = cart.products.filter(p=> p.productId != product)
  console.log(cart)
  Cart.update({_id:id }, {$set:{products: cart}})
  .then(_c => res.status(200).json({msg:"Se elimino producto correctamente"}))
  .catch(e=>res.json({msg:e.message}))
}
//OBTENER TODOS LOS CARRITOS
function getAllCarts(req, res) {
    Cart.find()
    .then(carts=>res.status(200).json(carts))
    .catch(e=>res.status(500).json({msg:e.message}))
}

async function emptyCart(id){
  try {
    return await Cart.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: { products: []} },
      { new: true }
    );
  } catch (error) {
    return error;
  }
}


module.exports = {
    emptyCart,
    addProductsToCart,
    deleteCart,
    getCartByID,
    getAllCarts, 
    deleteProductByid
}