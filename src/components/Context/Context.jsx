// Context/Context.js
import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../Config/firebaseConfig"; 
import swal from "sweetalert";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productsCollection = collection(db, "productos");
const ordersCollection = collection(db, "ordenes");

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  function cargarData() {
    getDocs(productsCollection)
      .then((snapshot) => {
        // let arrayProductos = snapshot.docs.map(el => el.data()).sort((a,b) => a.id - b.id); // Ordenados por id
        let arrayProductos = snapshot.docs.map((el) => el.data());
        setProductos(arrayProductos);
      })
      .catch((err) => console.error(err));
  }

  function agregarAlCarrito(id) {
    const carritoAuxiliar = [...carrito];

    const productoAAgregar = productos.find((el) => el.id === id);

    // 1. Tenemos que validar si el producto ya existe.
    // 2. Por ejemplo: some, comparo por id

    // carritoAuxiliar.some(el => el.id === id);

    // 3. Crear un nuevo objeto igual a productoAAgregar pero que además tenga la propiedad "CANTIDAD". Cuando el objeto no está en el array, le ponemos cantidad = 1. Cuando el objeto está en el array, le modificamos la cantidad sumándole 1.

    carritoAuxiliar.push(productoAAgregar);
    setCarrito(carritoAuxiliar);
  }

  function crearOrden() {
    if (carrito.length > 0) {
      const nuevaOrden = {
        nombre: "Lucas Ruiz",
        telefono: 231231231,
        mail: "lucas@coder.com",
        productos: carrito,
      };

      addDoc(ordersCollection, nuevaOrden)
        .then((response) => {
          console.log("Orden creada correctamente con el id: " + response.id);
          setCarrito([]);
        })
        .catch((err) => {
          alert("Algo falló, intente más tarde");
          console.error(err);
        });
    } else {
      swal.fire({
        title: "Error",
        text: "Tu carrito está vacío!",
        icon: "error",
      });
    }
  }

  return (
    <AppContext.Provider
      value={{
        productos,
        carrito,
        setCarrito,
        cargarData,
        agregarAlCarrito,
        crearOrden,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
