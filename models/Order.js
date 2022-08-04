const mongoose = require ("mongoose")
const ObjectId = require('mongodb').ObjectId;
const OrderSchema = new mongoose.Schema(
    {
        userId:{type: ObjectId, ref:'User'},
        timestamps:{type: Date, default:Date.now()},
        products:[{type: Object}],
        amount: { type:Number, require:true},
        address: { type: Object, required:true}
    }
);

module.exports = mongoose.model("Order", OrderSchema)