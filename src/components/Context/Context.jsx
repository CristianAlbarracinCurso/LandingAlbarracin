import { createContext, useContext, useState, useEffect } from "react";
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

  // Cargar productos desde Firestore
  useEffect(() => {
    cargarData();
  }, []);

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
  }, []);

  function cargarData() {
    getDocs(productsCollection)
      .then((snapshot) => {
        let arrayProductos = snapshot.docs.map((el) => el.data());
        setProductos(arrayProductos);
      })
      .catch((err) => console.error(err));
  }

  function agregarAlCarrito(producto, cantidad) {
    const carritoActualizado = [...carrito];
    const productoEnCarrito = carritoActualizado.find((p) => p.id === producto.id);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      carritoActualizado.push({ ...producto, cantidad });
    }

    setCarrito(carritoActualizado);

    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    swal({
      title: "Producto agregado",
      text: `${producto.nombre} ha sido agregado al carrito`,
      icon: "success",
      button: "OK",
    });
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
          localStorage.removeItem("carrito"); // Limpiar localStorage después de crear la orden
        })
        .catch((err) => {
          alert("Algo falló, intente más tarde");
          console.error(err);
        });
    } else {
      swal({
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
