const Item = require("../models/Items");

const creatItem = async (itemName, price) => {
    return await Item.create({itemName: itemName, price: price})
}

const getAllItem = async () => {
    return await Item.find();
}

const getItemById = async (userId) => {
    return await Item.findById({_id: userId})
}

const updateItem = async (updateCondition, itemObj) => {
    return await Item.findOneAndUpdate(updateCondition, itemObj, {new: true})
}

const deleteItem = async (deleteCondition) => {
    return await Item.findOneAndDelete(deleteCondition);
}

module.exports = {
    creatItem,
    getAllItem,
    getItemById,
    updateItem,
    deleteItem
}