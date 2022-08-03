const mongoose = require ("mongoose")

const MessageSchema = new mongoose.Schema(
    {
        author:{type: String, required:true, unique:true},
        text: {type: String, required:true, },
        time: {type: Date},
    }
);

module.exports = mongoose.model("Message", MessageSchema)