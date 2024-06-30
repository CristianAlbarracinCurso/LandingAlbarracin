import React from "react";
import SiteLogo from "./SiteLogo";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <>
      <div className="navbar-dark bg-dark">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <SiteLogo />
          </div>
          <div>
            <nav className="nav navbar-dark bg-dark">
              <div className="container">
                <ul className="nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="index.html"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="">
                      Productos
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div>
            <CartWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
