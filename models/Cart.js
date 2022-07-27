const mongoose = require ("mongoose")

const CartSchema = new mongoose.Schema(
    {
        id:{type: String, required:true, unique:true},
        products: [
            {
                productId:{
                    type:String
                },
                quantity:{
                    type: Number,
                    default: 1,
                }
            }
        ],

    }
);

module.exports = mongoose.model("Cart", CartSchema)