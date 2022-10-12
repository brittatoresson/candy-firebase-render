import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Billing from "./BillingModal";

function Order() {
  const [order, setOrder] = useState([
    { orderObj: { item: { name: "polka", desc: "god", flavor: "vanilla" } } },
  ]);
  let navigate = useNavigate();

  function getOrder() {
    try {
      fetch("https://candys.onrender.com/order")
        // fetch("http://localhost:4321/order")
        .then((res) => res.json())
        .then((data) => setOrder(data));
    } catch (error) {}
  }

  function deleteOrder(order) {
    try {
      fetch("https://candys.onrender.com/order", {
        // fetch("http://localhost:4321/order", {
        method: "DELETE",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  useEffect(() => {
    getOrder();
  }, [deleteOrder]);

  return (
    <section className="order">
      <section className="orderLists">
        <p>Your order: </p>
        {order
          ? order.map((item, i) => (
              <ul key={i}>
                <li>{item.orderObj.item.name}</li>
                {/* <li> Flavor {item.orderObj.item.flavor}</li>
                <li> {item.orderObj.item.desc}</li> */}
                <li>{item.orderObj.amount} st </li>
                <p onClick={() => deleteOrder(item)}>⏎</p>
              </ul>
            ))
          : null}
      </section>
      <Billing />{" "}
    </section>
  );
}

export default Order;
