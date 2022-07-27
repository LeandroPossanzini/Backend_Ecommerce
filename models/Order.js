const mongoose = require ("mongoose")

const OrderSchema = new mongoose.Schema(
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
        amount: { type:Number, require:true},
        address: { type: Object, required:true},
        status: {type: String, default: "Pending"}
    }
);

module.exports = mongoose.model("Order", OrderSchema)