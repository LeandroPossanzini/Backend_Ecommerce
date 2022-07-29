const User = require("../models/User");
const {authorization} = require("../middlewares/authorization")
const router = require ("express").Router();
const CryptoJS = require ("crypto-js");
const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

//OBTENER USUARIO POR ID(solo si es el admin)

router.get("/:id", isAdmin , async (req, res) => {
     try {
          const user = await User.findById(req.params.id)
          const { password, ...restoUser } = user._doc
          res.status(200).json(restoUser)
     } catch (error) {
          res.status(500).json(error)
     }
})

//OBTENER TODOS LOS USUARIOS (solo si es el admin)

router.get("/", isAdmin , async (req, res) => {
     try {
          const users = await User.find()
          res.status(200).json(users)
     } catch (error) {
          res.status(500).json(error)
     }
})

//UPDATE
router.put("/:id", authorization, async (req, res) =>{
   if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
   }

   try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updateUser)
   } catch (error) {
        res.status(500).json(error)
   }
})

// DELETE ( este no sabia si ponerlo para que solo el admin borre los usuarios o si un usuario
// se quisiera dar de baja. Opte por la opcion dos )

router.delete("/:id", verifyToken , async (req, res) => {
     try {
          await User.findByIdAndDelete(req.params.id)
          res.status(200).json("El usuario fue eliminado...")
     } catch (error) {
          res.status(500).json(error)
     }
})

module.exports = router