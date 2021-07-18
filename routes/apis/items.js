const { Router } = require("express");
const jwt = require("jsonwebtoken");
var path = require("path");
const JWT_SECRET = require("../../config");
const Resize = require("../../services/Resize");
const upload = require("../../middleware/uploadMiddleware");
const {
  getItemById,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  getMaleItems,
  getFemaleItems,
  getSellingItems,
  getPopularItems,
  getSearchTextItems,
} = require("../../services/items");
const {
  createCart,
  findItemsOfUserId,
  deleteCart,
  findCartByUserId,
} = require("../../services/carts");
const fs = require("fs");
const { parseCookies } = require("../../services/token");
const { requireUser } = require("../../middleware/auth");

const itemRouter = Router({ mergeParams: true });

itemRouter
  .get("/index", async (req, res) => {
    const listCookies = parseCookies(req);
    const token = listCookies.token;
    const items = await getAllItems();
    if (token) {
      const user = jwt.verify(token, JWT_SECRET);
      const cartItems = await findItemsOfUserId(user._id);
      const countCartItems = cartItems.length;
      if (user.typeUser === 1) {
        res.render("index", {
          layout: "index_layout.handlebars",
          items: items,
          countCartItems: countCartItems,
          cartItems: cartItems,
          username: user.username,
        });
      } else {
        res.render("admin", {
          layout: "admin_layout.handlebars",
          items: items,
          countCartItems: countCartItems,
          cartItems: cartItems,
          username: user.username,
        });
      }
    } else {
      res.render("index", {
        layout: "index_layout.handlebars",
        items: items,
        accessToken: "anonymous",
      });
    }
  })
  .post("/addItem", requireUser, upload.single("image"), async (req, res) => {
    const user = req.user;
    if (user) {
      if (user.typeUser === 0) {
        const { nameItem, price, popular, selling, sex } = req.body;
        popularItem = popular === "on" ? true : false;
        sellingItem = selling === "on" ? true : false;
        console.log(nameItem, price, popular, selling, sex);
        const imagePath = path.join(__dirname, "../../public/img/Item");
        const fileUpload = new Resize(imagePath, `${nameItem}.png`);
        if (!req.file) {
          res.status(401).json({ error: "Please provide an image" });
        }

        const filename = await fileUpload.save(req.file.buffer);
        const newItem = await createItem(
          nameItem,
          price,
          popularItem,
          sellingItem,
          sex
        );
        if (newItem) res.redirect(`/items/index`);
        else res.status(401).send({ message: "Create item fail" });
      } else {
        res.send("Just Admin can access to this page");
      }
    } else {
      res.send("AccessToken is required");
    }
  })
  .get("/addCart/:itemId", requireUser, async (req, res) => {
    const user = req.user;
    const itemId = req.params.itemId;
    const items = await getAllItems();
    const addCart = await createCart(itemId, user._id);
    if (addCart) {
      if (user.typeUser === 1) {
        res.redirect("/items/index");
      } else {
        res.render("index", {
          layout: "index_layout.handlebars",
          items: items,
        });
      }
    }
  })
  .get("/checkout", requireUser, async (req, res) => {
    const user = req.user;
    const cartUsers = await findCartByUserId(user._id);
    for (const idx in cartUsers) {
      await deleteCart({ _id: cartUsers[idx]._id });
    }
    res.redirect("/items/index");
  })
  .post(
    "/updateItem",
    requireUser,
    upload.single("image"),
    async (req, res) => {
      const user = req.user;
      if (user) {
        if (user.typeUser === 0) {
          const { nameItem, price, popular, selling, sex, itemIdModal } =
            req.body;
          console.log(itemIdModal);
          const popularItem = popular === "on" ? true : false;
          const sellingItem = selling === "on" ? true : false;
          console.log(nameItem, price, popularItem, sellingItem, sex);
          const imagePath = path.join(__dirname, "../../public/img/Item");
          const fileUpload = new Resize(imagePath, `${nameItem}.png`);
          const item = await getItemById(itemIdModal);
          const direcPath = imagePath + `/${item.nameItem}.png`;

          try {
            fs.unlinkSync(direcPath);
          } catch (err) {
            console.error(err);
          }
          if (!req.file) {
            res.status(401).json({ error: "Please provide an image" });
          }
          const filename = await fileUpload.save(req.file.buffer);
          const updateCondition = { _id: itemIdModal };
          const updateObj = {
            nameItem: nameItem,
            price: price,
            popular: popularItem,
            selling: sellingItem,
            sex: sex,
          };
          const updatedItem = await updateItem(updateCondition, updateObj);

          if (updatedItem) res.redirect(`/items/index`);
          else res.status(401).send({ message: "Create item fail" });
        } else {
          res.send("Just Admin can access to this page");
        }
      } else {
        res.send("AccessToken is required");
      }
    }
  )
  .get("/index/:typeSearch", async (req, res) => {
    const listCookies = parseCookies(req);
    const token = listCookies.token;
    let items = [];
    const typeSearch = req.params.typeSearch;
    if (typeSearch === "male") {
      items = await getMaleItems();
    } else if (typeSearch === "female") {
      items = await getFemaleItems();
    } else if (typeSearch === "selling") {
      items = await getSellingItems();
    } else if (typeSearch === "popular") {
      items = await getPopularItems();
    } else {
      items = await getSearchTextItems(typeSearch);
    }

    if (token) {
      const user = jwt.verify(token, JWT_SECRET);
      const cartItems = await findItemsOfUserId(user._id);
      const countCartItems = cartItems.length;
      if (user.typeUser === 1) {
        res.render("index", {
          layout: "index_layout.handlebars",
          items: items,
          countCartItems: countCartItems,
          cartItems: cartItems,
          username: user.username,
        });
      } else {
        res.render("admin", {
          layout: "admin_layout.handlebars",
          items: items,
          countCartItems: countCartItems,
          cartItems: cartItems,
          username: user.username,
        });
      }
    } else {
      res.render("index", {
        layout: "index_layout.handlebars",
        items: items,
        accessToken: "anonymous",
      });
    }
  })
  .post("/index/searchText", (req, res) => {
    const { searchText } = req.body;
    res.redirect(`/items/index/${searchText}`);
  })

  .get("/deleteItem", requireUser, async (req, res) => {
    const user = req.user;
    if (user) {
      if (user.typeUser === 0) {
        const id = req.query.id;
        await deleteItem({ _id: id });
        res.redirect("/items/index");
      } else {
        res.send("Just Admin can access to this page");
      }
    } else {
      res.send("AccessToken is required");
    }
  });

module.exports = itemRouter;
