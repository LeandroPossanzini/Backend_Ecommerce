const mongoose = require ("mongoose")
const ObjectId = require('mongodb').ObjectId;
const CartSchema = new mongoose.Schema(
    {
        idUser:{type: ObjectId, ref:'User'  },
        products: [
            {
                productId:{
                    type:ObjectId,
                    ref:'Product'
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