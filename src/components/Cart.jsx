import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useAppContext } from "./Context/Context";

const Cart = () => {
  // Traer funciones desde el context
  const { carrito, setCarrito, crearOrden, eliminarDelCarrito } =
    useAppContext();

  // Traer los productos desde el localStorage, persistencia de datos
  useEffect(() => {
    const carritoLocalStorage =
      JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
  }, [setCarrito]);

  // Calcular el precio total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  // Llama a la creación de la orden del context
  const handleFinalizarCompra = () => {
    if (carrito.length > 0) {
      crearOrden();
    }
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
                <button onClick={() => eliminarDelCarrito(producto.id)}>
                  -1
                </button>
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
