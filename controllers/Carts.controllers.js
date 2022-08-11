const Cart = require("./../models/Cart");


//CREAR CARRITO 

// implementar una funcion que si el carrito esta creado nos muestre el id y si no lo cree.
function createCart(req, res){
    // const newCart = req.body;
    // console.log(newCart)
    const user = req.user.id
    Cart.create({
        idUser:user,
        products:[]
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

  
  //OBTENER EL CARRITO POR ID DE CARRITO con productos
function getCartByID(req, res) {
  const populate = { 
      path: 'products.productId'
  }
  const id = req.params.cartId
  Cart.find({ idCart:id }).populate(populate)
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
    getAllCarts, 
    deleteProductByid
}