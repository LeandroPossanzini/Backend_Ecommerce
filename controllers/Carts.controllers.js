const Cart = require("./../models/Cart");


//CREAR CARRITO 

function createCart(req, res){
    const newCart = req.body;
    const user = req.user.id
    Cart.create({
        idUser:user,
        products:newCart
      })
      .then(cart=> res.status(201).json({msg: "se creo exitosamente", cart: cart}))
      .catch(err=> res.json(err.message))
  }
//AGREGAR PRODUCTOS A CARRITO 

async function addProductsToCart (req, res){
    const newProduct = req.body;
    const idCart = req.params.id;
    const carrito= await Cart.find({idCart:idCart}).exec()
    Cart.update({idCart :idCart }, {$set:{products: [...carrito[0].products, newProduct]}})
      .then(_cart=> res.json({msg:"Se Agrego el producto al carrito"}))
      .catch(err=> res.json({msg: err.message}))
  }
//BORRAR CARRITO POR ID 
function deleteCart(req, res) {
    Cart.findByIdAndDelete({idCart:req.params.id})
    .then(_cart =>res.status(200).json("El carrito fue eliminado exitosamente..."))
    .catch(e=> res.status(500).json({msg:e.message})) ;
  }


  //OBTENER EL CARRITO POR ID DE CARRITO DEL USER
  function getCartByID(req, res) {
    const id = req.params.cartId
    Cart.find({ idCart:id })
      .then(cart => res.status(200).json(cart))
      .catch(e=>res.status(500).json({msg:e.message}))
  }
//OBTENER TODOS LOS CARRITOS
function getAllCarts(_req, res) {
    Cart.find()
    .then(carts=>res.status(200).json(carts))
    .catch(e=>res.status(500).json({msg:e.message}))
}
module.exports = {
    createCart,
    addProductsToCart,
    deleteCart,
    getCartByID,
    getAllCarts
}