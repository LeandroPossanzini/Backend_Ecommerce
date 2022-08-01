const Order = require("./../models/Order");
const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");
const router = require("express").Router();



//CREAR ORDER
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ACTUALIZAR ORDER SI SOS ADMIN
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//BORRAR ORDEN POR ID 
router.delete("/:id",  isAdmin , async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("La Order fue cancelada...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//OBTENER LA ORDEN DEL USUARIO 
router.get("/find/:userId", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});


//OBTENER TODOS LAS ORDENES SOLO SI SOS ADMIN 

router.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;