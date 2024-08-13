import { useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useAppContext } from './Context/Context';

const Item = ({ nombre, precio, id }) => {
  const [cantidad, setCantidad] = useState(1);

  const url = `/img/${id}.png`;

  const cambioCantidad = (e) => {
    setCantidad(e.target.value);
  };

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoEnCarrito = carrito.find((producto) => producto.id === id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += parseInt(cantidad);
    } else {
      carrito.push({ id, nombre, precio, cantidad: parseInt(cantidad) });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    swal({
      title: "Producto agregado",
      text: `Agregaste ${cantidad} ${nombre} al carrito.`,
      icon: "success",
      button: "OK",
    });
  };

  return (
    <div key={id} className="card-item">
      <h3 style={{ justifySelf: "center" }}>{nombre}</h3>
      <img className="img" src={url} alt={nombre} />
      <p>
        Precio: <b>${precio}</b>
      </p>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={cantidad}
          min="1"
          onChange={cambioCantidad}
          style={{ width: "50px", marginLeft: "10px" }}
        />
      </div>
      <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      <Link to={`/detalle/${id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
};

export default Item;
