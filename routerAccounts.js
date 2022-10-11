const express = require("express");
const router = express.Router();
const bcryptFunctions = require("./bcrypt");
const myFunctions = require("./config");

//GET ACCOUNTS; oklart om detta behövs
router.get("/accounts", async (req, res) => {
  const snapshot = await myFunctions.Accounts.get();
  const accounts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(accounts);
});

//SIGN UP
router.post("/signup", async (req, res) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password,
  };
  const resObj = {
    success: false,
    usernameExists: false,
  };

  const snapshot = await myFunctions.Accounts.get();
  const accounts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  async function bcrypt(username) {
    let hasedPassword = await bcryptFunctions.hashPassword(
      credentials.password
    );
    credentials.password = bcryptFunctions.hashPassword;
    await myFunctions.Accounts.add({
      username: username,
      password: hasedPassword,
    });
  }
  ///FORTSÄTT HÄÄÄR
  accounts.map(async (account) => {
    if (account.username === credentials.username) {
      resObj.success = false;
      resObj.usernameExists = true;
      console.log("false");
      return;
    } else if (accounts.length <= 0) {
      bcrypt(credentials.username);
    }
  });

  if (resObj.usernameExists === false) {
    bcrypt(credentials.username);
    resObj.success = false;
  }

  res.json(resObj);
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let resObj = { isAuth: false, username: "" };
  const snapshot = await myFunctions.Accounts.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  let comparedPassword;
  let hasedPassword;
  list.map(async (i) => {
    if (i.username === username) {
      hasedPassword = i.password;
    }
  });
  comparedPassword = await bcryptFunctions.comparePassword(
    password,
    hasedPassword
  );
  if (comparedPassword === true) {
    (resObj.isAuth = true), (resObj.username = username);
  }
  res.json({ resObj });
});

module.exports = router;
