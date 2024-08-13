import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./Cart.css";
import { useAppContext } from "./Context/Context";

const Cart = () => {
  const { carrito } = useAppContext();

  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  const handleFinalizarCompra = () => {
    swal({
      title: "Compra realizada con éxito",
      text: "Gracias por tu compra",
      icon: "success",
      button: "OK",
    }).then(() => {
      localStorage.removeItem("carrito");
      setCarrito([]);
    });
  };

  return (
    <div className="carrito-container">
      <h2>Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="carrito-lista">
            {carrito.map((producto) => (
              <li key={producto.id} className="carrito-item">
                <h3>{producto.nombre}</h3>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio unitario: ${producto.precio}</p>
                <p>Total: ${producto.precio * producto.cantidad}</p>
              </li>
            ))}
          </ul>
          <h3>Total a pagar: ${calcularTotal()}</h3>
          <Link to="../productos">
            <button>Seguir comprando</button>
          </Link>
          <button onClick={handleFinalizarCompra}>Finalizar compra</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
