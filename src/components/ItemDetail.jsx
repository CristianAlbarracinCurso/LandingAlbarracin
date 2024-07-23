import { useParams } from "react-router-dom";
import ItemDetailSingle from "./ItemDetailSingle";
import { useEffect, useState } from "react";

const ItemDetail = ({ productos }) => {
  const { id } = useParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    if (productos && id) {
      const findProduct = productos.find((el) => el.id === id);

      setProductoSeleccionado(findProduct);
    }
  }, [id, productos]);

  return (
    <div>
      {productoSeleccionado ? (
        <>
          <h3>Detalle del producto:</h3>
          <ItemDetailSingle
            key={productoSeleccionado.id}
            id={productoSeleccionado.id}
            nombre={productoSeleccionado.nombre}
            categoria={productoSeleccionado.categoria}
            precio={productoSeleccionado.precio}
            descripcion={productoSeleccionado.descripcion}
          />
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}
    </div>
  );
};

export default ItemDetail;
