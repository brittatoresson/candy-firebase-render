import { Link } from "react-router-dom";
function Header() {
  return (
    <section id="header-nav">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/order">Order</Link>
      <Link to="/products">Products</Link>
    </section>
  );
}

export default Header;
