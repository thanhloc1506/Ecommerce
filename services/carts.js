const Cart = require("../models/Carts");
const { getItemById } = require("./items");

const createCart = async (itemId, userId) => {
  return await Cart.create({ Item: itemId, User: userId });
};

const getCartByUser = async (userId) => {
  return await Cart.find({ User: userId });
};

const updateCart = async (updateCondition, cardObj) => {
  return await Cart.findOneAndUpdate(updateCondition, cardObj, { new: true });
};

const deleteCart = async (deleteCondition) => {
  return await Cart.findByIdAndDelete(deleteCondition);
};

const findItemsOfUserId = async (userId) => {
  const foundCartItems = await Cart.find({ User: userId }).lean();
  let items = [];
  for (const idx in foundCartItems) {
    items[idx] = await getItemById(foundCartItems[idx].Item);
  }
  return items;
};

const findCartByUserId = async (userId) => {
  return await Cart.find({ User: userId });
};

module.exports = {
  createCart,
  getCartByUser,
  updateCart,
  deleteCart,
  findItemsOfUserId,
  findCartByUserId,
};
