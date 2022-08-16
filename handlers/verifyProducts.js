const ProductModel = require ("../models/Product");


async function verifyProduct(req, res, next) {
    const productExist =await ProductModel.findOne({_id:  req.body.productId})
    try {
        if(!productExist) throw new Error("No existe el producto")
        next()
    } catch (error) {
        res.json({msg:error.message})
    }
}

module.exports = {verifyProduct};