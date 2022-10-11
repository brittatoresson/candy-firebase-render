import "./App.scss";
import SearchCandy from "./Components/SearchCandy";
import GetMucis from "./Components/Products";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./Components/Order";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    document.cookie.includes("username") ? setUser(true) : setUser(false);
  }, [user]);

  //// MED MAJA
  async function shoppingList(params) {
    const res = fetch("https://shoppinglist-3lmh.onrender.com/shoppinglists");
    const data = await (await res).json();
    // console.log(data);
  }

  shoppingList();

  return (
    <BrowserRouter>
      <SignUp state={{ user, setUser }} />
      {user ? (
        <div className="App">
          <Header />
          <Routes>
            <Route path="/"></Route>
            <Route path="/search" element={<SearchCandy />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/products" element={<GetMucis />}></Route>
          </Routes>
        </div>
      ) : null}
    </BrowserRouter>
  );
}

export default App;
