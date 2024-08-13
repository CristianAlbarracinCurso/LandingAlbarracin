import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../Config/firebaseConfig";
import Swal from 'sweetalert2'




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

    Swal.fire({
      title: "Producto agregado",
      text: `${producto.nombre} ha sido agregado al carrito`,
      icon: "success",
      button: "OK",
    });
  }

  function crearOrden() 
  {

      Swal.fire({
        title: 'Información de contacto',
        html: `
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
          <input type="text" id="mail" class="swal2-input" placeholder="Email">
          <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono">
        `,
        confirmButtonText: 'Confirmar',
        focusConfirm: false,
        preConfirm: () => {
          const nombre = Swal.getPopup().querySelector('#nombre').value;
          const mail = Swal.getPopup().querySelector('#mail').value;
          const telefono = Swal.getPopup().querySelector('#telefono').value;
          if (!nombre || !mail || !telefono) {
            Swal.showValidationMessage(`Todos los campos son requeridos`);
            return false;
          }
          return { nombre, mail, telefono };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const { nombre, mail, telefono } = result.value;
          if (carrito.length > 0) {
            const nuevaOrden = {
              nombre,
              telefono,
              mail,
              productos: carrito,
            };
    
            addDoc(ordersCollection, nuevaOrden)
              .then((response) => {
                console.log("Orden creada correctamente con el id: " + response.id);
                setCarrito([]);
                Swal.fire({
                  title: 'Compra realizada con éxito',
                  text: `Gracias por tu compra, su codigo de orden es: ${response.id}`,
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              })
              .catch((err) => {
                Swal.fire({
                  title: 'Error',
                  text: 'Algo falló, intente más tarde',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
                console.error(err);
              });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Tu carrito está vacío!',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      });
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
