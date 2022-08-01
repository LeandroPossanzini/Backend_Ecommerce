const Cart = require("./../models/Cart");
const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken , authorization } = require("../middlewares/verifyToken");
const router = require("express").Router();



//CREAR CARRITO MIENTRAS ESTAS LOGEADO

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ACTUALIZAR CARRITO MIENTRAS EL USUARIO ESTA LOGUEADO
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//BORRAR CARRITO POR ID 
router.delete("/:id", verifyToken , async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("El carrito fue eliminado exitosamente...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//OBTENER EL CARRITO DEL USUARIO 
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


//OBTENER TODOS LOS CARRITOS SOLO SI SOS ADMIN 

router.get("/", isAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;