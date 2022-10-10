const express = require("express");
const cors = require("cors");
const myFunctions = require("./config");
const accountRouter = require("./routerAccounts");
const { get } = require("./routerAccounts");
const app = express();

app.use(express.json());
app.use(accountRouter);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hej från webbisserveris");
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
    // const query = await db.collection(myFunctions.Shoppinglist).get();
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

app.post("/shoppinglist", async (req, res) => {
  const { id } = req.body;
  let item;
  try {
    const ref = await myFunctions.Shoppinglist.doc(id);
    const doc = await ref.get();
    console.log(doc.data());
    item = ref;
  } catch (error) {}

  res.json({ item });
});

app.patch("/shoppinglist", async (req, res) => {
  const { id, done, name } = req.body;
  try {
    const doc = await myFunctions.Shoppinglist.doc(id).get();
    let items = doc.data().items;

    await myFunctions.Shoppinglist.doc(id).update({ done });

    // items.map(async (item) => {
    //   // if (item.name == name) {
    //   // doc.update(done);
    //   // }
    // });
  } catch (error) {}

  res.json({ hej: "hej" });
});

app.listen(4321, () => console.log("Up & RUnning *4000"));
