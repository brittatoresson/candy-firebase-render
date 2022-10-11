import { useState } from "react";

function Billing() {
  const [item, setItem] = useState();
  const [payment, setPayment] = useState();

  function handleInput(e) {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  function confirmPurchase(params) {
    console.log(item);
    console.log(payment);
  }

  return (
    <section className="billingInfo">
      <input
        type="text"
        placeholder="Full name"
        name="fullname"
        onChange={(e) => handleInput(e)}
      ></input>

      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={(e) => handleInput(e)}
      ></input>
      <input
        type="text"
        placeholder="Adress"
        name="adress"
        onChange={(e) => handleInput(e)}
      ></input>
      <input
        type="text"
        placeholder="City"
        name="city"
        onChange={(e) => handleInput(e)}
      ></input>
      <input
        type="text"
        placeholder="Postal code"
        name="postalcode"
        onChange={(e) => handleInput(e)}
      ></input>
      <section className="radio">
        <label htmlFor="swish">Swish</label>
        <input
          type="radio"
          name="payment"
          id="swish"
          onChange={(e) => setPayment(e.target.id)}
        />
        <label htmlFor="creditcard">Creditcard</label>
        <input
          type="radio"
          name="payment"
          id="creditcard"
          onChange={(e) => setPayment(e.target.id)}
        />
      </section>

      <button onClick={confirmPurchase}>Buy</button>
    </section>
  );
}

export default Billing;
