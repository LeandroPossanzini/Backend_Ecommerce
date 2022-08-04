const Product = require("../models/Product");
const router = require ("express").Router();
const CryptoJS = require ("crypto-js");
const { isAdmin } = require("../handlers/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");
const {upload} = require("./../handlers/upload")
const {uploadFile} = require("./../handlers/upload")
const fs = require('fs')


// CARGAR LA FOTO EN MULTER
router.post("/upload", verifyToken ,upload, uploadFile)


// CREAR PRODUCTO SOLO SI ES ADMIN Y ESTA LOGEADO
router.post("/", verifyToken ,isAdmin, async (req,res) =>{
    const newProduct = new Product(req.body)
    const ruta = `./../uploads/${newProduct.image}`
    
    try {
        const saveProducts = await newProduct.save()
        res.status(200).json(saveProducts)
    } catch (error) {
        res.status(401).json("ERROR_EN_LA_CARGA_DEL_PRODUCTO")
    }
});

// ACTUALIZAR PRODUCTO SOLO SI ES ADMIN Y ESTA LOGUEADO
router.put("/:id", verifyToken ,isAdmin , async (req, res) =>{
   try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true});
        res.status(200).json(updateProduct)
   } catch (error) {
        res.status(500).json(error)
   }
})

//OBTENER TODOS LOS PRODUCTOS, SIN LOGUEO Y SIN SER ADMIN

router.get("/", async (req, res) => {
     try {
          const products = await Product.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json(error)
     }
})


//BUSCAR PRODUCTO POR ID, SIENDO ADMIN...

router.get("/:id", verifyToken, isAdmin ,async (req, res) => {
     try {
          const products = await Product.findById(req.params.id)
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json(error)
     }
})

// BORRAR PRODUCTO SOLO SI ES ADMIN 

router.delete("/:id", verifyToken, isAdmin , async (req, res) => {
     try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("El producto fue eliminado...")
     } catch (error) {
          res.status(500).json(error)
     }
})

module.exports = router