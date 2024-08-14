import SiteLogo from "./SiteLogo";
import CartWidget from "./CartWidget";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-dark bg-dark">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link to="/">
            <SiteLogo />
          </Link>
        </div>
        <div>
          <ul className="nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/">- Home -</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos">- Productos -</Link>
            </li>
            <li className="nav-item">
              <Link to="/contactos">- Contacto -</Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/cart">
            <CartWidget />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
