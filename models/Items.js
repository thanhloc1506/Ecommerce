const mongoose = require("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema({
    nameItem: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: "carts",
    }
    
})

const Item = mongoose.model("items", itemSchema);
module.exports = Item
