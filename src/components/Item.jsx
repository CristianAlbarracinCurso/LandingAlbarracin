import { useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useAppContext } from './Context/Context';

const Item = ({ nombre, precio, id, categoria }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useAppContext(); // Usar la función agregarAlCarrito del contexto

  const url = `/img/${id}.png`;

  const cambioCantidad = (e) => {
    setCantidad(parseInt(e.target.value, 10)); // Asegurar que la cantidad sea un número entero
  };

  const handleAgregarAlCarrito = () => {
    const producto = { id, nombre, precio, categoria }; // Asegúrate de incluir categoria
    agregarAlCarrito(producto, cantidad);
    swal({
      title: "Producto agregado",
      text: `${nombre} ha sido agregado al carrito`,
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
      <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
      <Link to={`/detalle/${id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
};

export default Item;
