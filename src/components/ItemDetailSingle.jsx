import "./ItemDetailSingle.css";
import { Link } from "react-router-dom";
import { useAppContext } from './Context/Context';

const ItemDetailSingle = ({ nombre, precio, id, descripcion, categoria }) => {
  const { agregarAlCarrito } = useAppContext(); // Usar función del contexto para agregar al carrito
  const url = `../img/${id}.png`;

  const handleAgregarAlCarrito = () => {
    const producto = { id, nombre, precio, categoria }; // Crear objeto de producto
    agregarAlCarrito(producto, 1); // Agregar 1 unidad del producto al carrito
  };

  return (
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
  );
};

export default ItemDetailSingle;
