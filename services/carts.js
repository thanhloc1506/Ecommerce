const Cart = require("../models/Carts")

const createCart = async (itemId, userId) => {
    return await Cart.create({Item: itemId, User: userId})
}

const getCartByUser = async (userId) => {
    return await Cart.find({User: userId})
}

const updateCart = async (updateCondition, cardObj) => {
    return await Cart.findOneAndUpdate(updateCondition, cardObj, {new: true})
}

const deleteCart = async (deleteCondition) => {
    return await Cart.findByIdAndDelete(deleteCondition)
}


module.exports = {
    createCart,
    getCartByUser,
    updateCart,
    deleteCart
}