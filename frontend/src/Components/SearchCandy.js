import { createContext, useEffect, useState } from "react";
import Order from "./Order";

export const UserContext = createContext();

function SearchCandy() {
  const [item, setItem] = useState({});
  const [flavors, setFlavors] = useState();
  const [searchItem, setSearchItem] = useState({
    isMatch: undefined,
    itemArray: [],
  });
  const [resMesg, setResMes] = useState("");
  const [orderItem, setOrderItem] = useState("");
  const [orderMsg, setOrderMsg] = useState("");

  function handleInput(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  function searchCandy() {
    try {
      fetch("https://candys.onrender.com/candy", {
        // fetch("http://localhost:4321/candy", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setSearchItem(data));
      setResMes(`Sorry, no ${item.name} in store`);
    } catch (error) {
      console.log(error.message);
    }
  }

  function getFlavors() {
    try {
      fetch("http://localhost:4321/flavors")
        .then((res) => res.json())
        .then((data) => setFlavors(data[0].Flavor));
    } catch (error) {}
  }

  //SEND TO ORDER
  async function orderProduct(item) {
    const sendOrder = {
      ...item,
    };
    await fetch("https://candys.onrender.com/order", {
      // await fetch("http://localhost:4321/order", {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setOrderMsg(`${item.name} is added to cart`);
  }

  useEffect(() => {
    getFlavors();
  }, []);

  return (
    <section>
      <input
        type="text"
        placeholder="candy"
        name="name"
        onChange={(e) => handleInput(e)}
      ></input>
      <button onClick={searchCandy}> Sök</button>

      <select onChange={(e) => setItem({ name: e.target.value })}>
        {flavors?.map((flavor, i) => (
          <option value={flavor} key={i}>
            {flavor}{" "}
          </option>
        ))}
      </select>
      <UserContext.Provider value={orderItem}>
        {orderItem ? <Order /> : null}{" "}
      </UserContext.Provider>

      {searchItem.isMatch ? (
        searchItem.itemArray.map((item, i) => (
          <section key={i}>
            <h3 onClick={() => orderProduct(item)}>{item.name}</h3>
            <li>{item.flavor}</li>
            <li>{item.desc}</li>
          </section>
        ))
      ) : (
        <p>{resMesg}</p>
      )}
      <p>{orderMsg}</p>
    </section>
  );
}

export default SearchCandy;
