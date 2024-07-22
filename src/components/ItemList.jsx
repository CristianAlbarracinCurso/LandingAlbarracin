import Item from "./Item";
import "./ItemList.css";

const ItemList = ({ productos }) => {
  return (
    <div className="item-list">
      {
        productos.map((producto) => {
          return (
            <Item
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            descripcion={producto.descripcion}
            />
          );
        })
      }
    </div>
  );
};

export default ItemList;
