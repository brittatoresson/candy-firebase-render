import { createContext, useEffect, useState } from "react";
import Order from "./Order";

export const UserContext = createContext();

function SearchCandy() {
  const [item, setItem] = useState({});
  const [flavors, setFlavors] = useState();
  const [flavor, setFlavor] = useState("");
  const [searchItem, setSearchItem] = useState({
    isMatch: undefined,
    item: {},
  });
  const [resMesg, setResMes] = useState("");

  const [orderItem, setOrderItem] = useState("");

  function handleInput(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }
  function searchCandy() {
    try {
      fetch("http://localhost:4321/candy", {
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
      <input
        type="text"
        placeholder="flavor"
        name="flavor"
        onChange={(e) => handleInput(e)}
      ></input>
      <input
        type="number"
        placeholder="amount"
        name="amount"
        onChange={(e) => handleInput(e)}
      ></input>
      <button onClick={searchCandy}> Sök</button>
      <select onChange={(e) => setFlavor(e.target.value)}>
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
        <section>
          <p>{searchItem.item.name}</p>
          <p>{searchItem.item.flavor}</p>
        </section>
      ) : (
        <p>{resMesg}</p>
      )}
    </section>
  );
}

export default SearchCandy;
