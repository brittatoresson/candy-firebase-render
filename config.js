const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "AIzaSyACYJ5Cm2Y-i7HJes2ET2QW67zvIgLrZeo",
//   authDomain: "tutorial-e06c1.firebaseapp.com",
//   projectId: "tutorial-e06c1",
//   storageBucket: "tutorial-e06c1.appspot.com",
//   messagingSenderId: "863505404334",
//   appId: "1:863505404334:web:132118b0d6acd7dfa3f83f",
//   measurementId: "G-SW2M0FYQG5",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCbviJvAxw2SKUtO1vdsPQqF6kBVDBRHSE",
  authDomain: "brittasmusic123.firebaseapp.com",
  projectId: "brittasmusic123",
  storageBucket: "brittasmusic123.appspot.com",
  messagingSenderId: "961689523128",
  appId: "1:961689523128:web:0ee246ceb36d61fa82f54d",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const Candys = db.collection("Candy");
const Flavors = db.collection("Flavors");
const Orders = db.collection("Orders");
const Accounts = db.collection("Accounts");
const Shoppinglist = db.collection("shoppinglist");

module.exports = {
  Flavors,
  Candys,
  Orders,
  Accounts,
  Shoppinglist,
};
