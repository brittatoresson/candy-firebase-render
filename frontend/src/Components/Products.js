import { useEffect, useState } from "react";

function GetMucis() {
  const [myCandyList, setMyCandyList] = useState([]);
  const [amount, setAmount] = useState(0);
  const [candyId, setCandyId] = useState();
  const [orderMsg, setOrderMsg] = useState("");

  function getData() {
    try {
      fetch("http://localhost:4321/candy")
        .then((res) => res.json())
        .then((data) => setMyCandyList(data));
    } catch (error) {}
  }

  async function orderProduct(item) {
    const sendOrder = {
      ...item,
      amount,
    };
    await fetch("http://localhost:4321/order", {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setAmount(0);
    setOrderMsg(`${sendOrder.name} is added to cart`);
  }

  useEffect(() => {
    getData();
  }, []);

  function getAmount(id, add) {
    const chosenCandyId = id;
    const candyArrayId = myCandyList.map((id) => id.id);
    setCandyId(candyArrayId.find((id) => id == chosenCandyId));

    if (candyId) {
      if (amount <= 100 && add == "add") {
        setAmount(amount + 1);
        return;
      } else if (amount >= 1 && add == "sub") {
        setAmount(amount - 1);
        return;
      }
    }
  }

  return (
    <section className="candyList">
      {orderMsg}
      {myCandyList.map((candy, i) => (
        <ul key={i}>
          <li>{candy.name} </li>
          <li>{candy.flavor} </li>
          <li>{candy.desc} </li>
          <li>
            <p onClick={() => getAmount(candy.id, "add")}>➕</p>
            <p onClick={() => getAmount(candy.id, "sub")}>➖</p>
          </li>
          {candyId === candy.id ? <li>{amount} </li> : null}
          <p onClick={() => orderProduct(candy)}> Add to cart </p>
        </ul>
      ))}
    </section>
  );
}

export default GetMucis;
