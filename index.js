const express = require("express");
const cors = require("cors");
const myFunctions = require("./config");
const accountRouter = require("./routerAccounts");
const { get } = require("./routerAccounts");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(accountRouter);

app.get("/", (req, res) => {
  res.send("Hej från shoppinglist och candylist");
});

// GET CANDY
app.get("/candy", async (req, res) => {
  const snapshot = await myFunctions.Candys.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

// POST CANDY
app.post("/candy", async (req, res) => {
  const serachItem = req.body.name;
  const resObj = {
    isMatch: false,
    item: {},
  };

  const snapshot = await myFunctions.Candys.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  list.map((i) => {
    if (serachItem.toLowerCase() == i?.name?.toLowerCase()) {
      resObj.isMatch = true;
      resObj.item = i;
    }
  });
  res.send(resObj);
});
//GET ORDER
app.get("/order", async (req, res) => {
  const snapshot = await myFunctions.Orders.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

//DELETE ORDER
app.delete("/order", async (req, res) => {
  const id = req.body.id;
  await myFunctions.Orders.doc(id).delete();
  res.send({ msg: "Order deleted" });
});

// ADD ORDER
app.post("/order", async (req, res) => {
  let orderObj = {
    inStock: false,
    item: undefined,
    amount: req.body.amount,
  };
  const input = req.body.name;
  const snapshot = await myFunctions.Candys.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  list.map((i) => {
    if (
      input.toLowerCase() == i?.name?.toLowerCase() ||
      input.toLowerCase() == i.flavor
    ) {
      orderObj.item = i;
    }
  });

  if (orderObj.item) {
    orderObj.inStock = true;
    await myFunctions.Orders.add({ orderObj });
  }

  res.send(orderObj);
});
// UPDATE CANDY
app.post("/update", async (req, res) => {
  const id = req.body.id;
  delete req.body.id;
  const data = req.body;
  await myFunctions.Accounts.doc(id).update(data);
  res.send({ msg: "User Added" });
});

// GET FLAVOR
app.get("/flavors", async (req, res) => {
  const snapshot = await myFunctions.Flavors.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});

////////// MED MAJA 10 OKTOBER ///////////////////

app.get("/shoppinglist", async (req, res) => {
  const shoppingList = [];
  try {
    const query = await myFunctions.Shoppinglist.get();

    query.forEach((doc) => {
      console.log(doc.data());
      shoppingList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {}

  res.json({ list: shoppingList });
});

//POST
app.post("/shoppinglist", async (req, res) => {
  const { done, name, amount } = req.body;
  let item = {
    done,
    name,
    amount,
  };

  await myFunctions.Shoppinglist.add({ item });

  res.send(item);
});
//PATCH
app.patch("/shoppinglist", async (req, res) => {
  const { id, done, name } = req.body;
  try {
    await myFunctions.Shoppinglist.doc(id).update({ done });
    /// MED MAJA
    const ref = await myFunctions.Shoppinglist.doc(id);
    const doc = await myFunctions.Shoppinglist.doc(id).get();
    let itemsList = doc.data().items;
    let itemsIndex = itemsList.findIndex((i) => i.name === name);
    itemsList[itemsIndex].done = done;
    await ref.update({ items: itemsList });
  } catch (error) {}

  res.json({ hej: "updaterad?" });
});

//DELETE
app.delete("/item", async (req, res) => {
  const { id } = req.body;
  try {
    await myFunctions.Shoppinglist.doc(id).delete();
  } catch (error) {}

  res.json({ hej: "delete?" });
});

app.listen(4321, () => console.log("Up & RUnning *4000"));
