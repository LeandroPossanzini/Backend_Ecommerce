const Product = require("../models/Product");
const fs = require("fs")

// CREAR PRODUCTO
async function createProduct(req,res){
    const newProduct = new Product(req.body)
    try {
        await fs.promises.access(`./uploads/${newProduct.image}`)
        newProduct.image = `./../uploads/${newProduct.image}`
    } catch (error) {
        newProduct.image = `./../uploads/producto.png`
    }
    try {
        const saveProducts = await newProduct.save()
        res.status(200).json(saveProducts)
    } catch (error) {
        res.status(401).json("ERROR_EN_LA_CARGA_DEL_PRODUCTO")
    }
}

// ACTUALIZAR PRODUCTO
async function updateProducts(req, res) {
    try {
         const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
             $set: req.body
         }, {new:true});
         res.status(200).json(updateProduct)
    } catch (error) {
         res.status(500).json(error)
    }
 }
//BUSCAR PRODUCTO POR ID
async function getByID(req, res) {
    try {
         const products = await Product.findById(req.params.id)
         res.status(200).json(products)
    } catch (error) {
         res.status(500).json(error)
    }
}
// BORRAR PRODUCTO

async function deleteByID(req, res){
    try {
       await Product.findByIdAndDelete(req.params.id)
       res.status(200).json("El producto fue eliminado...")
    } catch (error) {
         res.status(500).json(error)
    }
}


//OBTENER TODOS LOS PRODUCTOS
async function getAll(_req, res){
        try {
             const products = await Product.find()
             res.status(200).json(products)
        } catch (error) {
             res.status(500).json(error)
        }
   }




module.exports={
    createProduct,
    updateProducts,
    getByID,
    deleteByID,
    getAll
}