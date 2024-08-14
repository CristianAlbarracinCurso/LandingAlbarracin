import "./ItemDetailSingle.css";
import { Link } from "react-router-dom";
import { useAppContext } from "./Context/Context";

const ItemDetailSingle = ({ nombre, precio, id, descripcion, categoria }) => {
  // Usar función del contexto para agregar al carrito
  const { agregarAlCarrito } = useAppContext();
  const url = `../img/${id}.png`;

  const handleAgregarAlCarrito = () => {
    // Crear objeto de producto y agregar 1 unidad al carrito
    const producto = { id, nombre, precio, categoria };
    agregarAlCarrito(producto, 1); //
  };

  return (
    <div className="container">
      <div key={id} className="card-container">
        <h4 style={{ justifySelf: "center" }}>{nombre}</h4>
        <div>
          <img className="img" src={url} alt={nombre} />
        </div>
        <p>
          Categoria: <b>{categoria}</b>
          <br />
          {descripcion} <br />
          Precio: <b>${precio}</b>
        </p>
        <div>
          <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
        </div>
        <Link to="../productos">
          <button>Seguir comprando</button>
        </Link>
      </div>
    </div>
  );
};

export default ItemDetailSingle;
