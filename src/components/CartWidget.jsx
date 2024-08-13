import logoCarrito from "../assets/logoCarrito2.png";
import "./CartWidget.css";
import React, { useEffect, useState } from "react";
import { useAppContext } from './Context/Context';

const CartWidget = () => {
  const [carrito, setCarrito] = useState([]);
  const [itemCarrito, setItemCarrito] = useState(0);

  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
  }, []);

  useEffect(() => {
    const calcularCant = () => {
      return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    };
    setItemCarrito(calcularCant());
  }, [carrito]);

  return (
    <>
      <span className="cart-num">
        <span className="position-relative start-50 translate-middle badge rounded-pill bg-danger">
          {itemCarrito}
        </span>
        <img src={logoCarrito} alt="Logo" width="45px" />
      </span>
    </>
  );
};

export default CartWidget;
