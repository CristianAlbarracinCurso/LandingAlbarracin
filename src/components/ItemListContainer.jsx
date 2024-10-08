import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import Loader from "./Loader";
import { useAppContext } from "./Context/Context";

const ItemListContainer = () => {
  const { cargarData, productos } = useAppContext();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  useEffect(() => {
    cargarData();
  }, []);

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria)),
  ];

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoriaSeleccionada
        );

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  return (
    <>
      {productos.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h4 style={{ padding: "2rem" }}>
            Bienvenidos, seleccione los productos que desea comprar.
          </h4>

          <div>
            <label htmlFor="categoria" style={{ padding: "2rem" }}>
              <h5>Seleccionar categoría: </h5>
            </label>
            <select
              id="categoria"
              value={categoriaSeleccionada}
              onChange={handleCategoriaChange}
            >
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <ItemList productos={productosFiltrados} />
        </>
      )}
    </>
  );
};

export default ItemListContainer;
