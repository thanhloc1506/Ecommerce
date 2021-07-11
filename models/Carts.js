const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    Item: {
        type: Schema.Types.ObjectId,
        ref: "items",
        required: true,
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
    
})

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart
