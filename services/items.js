const Item = require("../models/Items");

const createItem = async (nameItem, price, popular, selling, sex) => {
  return await Item.create({
    nameItem: nameItem,
    price: price,
    popular: popular,
    selling: selling,
    sex: sex,
  });
};

const getAllItems = async () => {
  return await Item.find().lean();
};

const getItemById = async (itemId) => {
  return await Item.findById({ _id: itemId }).lean();
};

const updateItem = async (updateCondition, itemObj) => {
  return await Item.findOneAndUpdate(updateCondition, itemObj, { new: true });
};

const deleteItem = async (deleteCondition) => {
  return await Item.findOneAndDelete(deleteCondition);
};

const getMaleItems = async () => {
  return await Item.find({ sex: "Male" }).lean();
};

const getFemaleItems = async () => {
  return await Item.find({ sex: "Female" }).lean();
};

const getSellingItems = async () => {
  return await Item.find({ selling: true }).lean();
};

const getPopularItems = async () => {
  return await Item.find({ popular: true }).lean();
};

const getSearchTextItems = async (searchText) => {
  const Items = await getAllItems();
  let searchItems = [];
  var idx = 0;
  for (const i in Items) {
    if (Items[i].nameItem.includes(searchText)) {
      searchItems[idx] = Items[i];
      idx += 1;
    }
  }
  return searchItems;
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMaleItems,
  getFemaleItems,
  getSellingItems,
  getPopularItems,
  getSearchTextItems,
};
