const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        name:{type: String, required:true, unique:true},
        descripcion: {type: String, required:true, },
        price: {type:Number, require:true},
        image: {type: String, required:true}

    }
);

module.exports = mongoose.model("Product", ProductSchema)