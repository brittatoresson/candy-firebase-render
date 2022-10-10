import "./App.scss";
import SearchCandy from "./Components/SearchCandy";
import GetMucis from "./Components/Products";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./Components/Order";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(false);

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    getCookie("username");
    console.log(user);
  }, [user]);

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
