import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(prop) {
  let setUser = prop.state.setUser;
  let user = prop.state.user;

  const [credentials, setCredientials] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  function handleInput(e) {
    setCredientials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function addUser() {
    fetch("https://candys.onrender.com/ignup", {
      // fetch("http://localhost:4321/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function login() {
    setErrorMsg("");
    const response = await fetch("https://candys.onrender.com/login", {
      // const response = await fetch("http://localhost:4321/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    data.resObj.isAuth
      ? navigate("/products")
      : setErrorMsg("Please try again");
    document.cookie = `username=${data.resObj.username}`;
    setUser(data.resObj.isAuth);
  }

  async function logout() {
    setUser(false);
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  }

  return (
    <section className="mainSignUp">
      {user ? (
        <button onClick={() => logout()}> Logout</button>
      ) : (
        <section className="signUpInput">
          <h3>Sign up</h3>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleInput(e)}
          ></input>
          <button onClick={addUser}> Sign Up</button>
          <h3> Log in</h3>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleInput(e)}
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleInput(e)}
          ></input>
          <button onClick={login}> Log in</button> {errorMsg}
        </section>
      )}
    </section>
  );
}

export default SignUp;
