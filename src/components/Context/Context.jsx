import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../Config/firebaseConfig";
// Importar sweetalert2 para modal mejorado
import Swal from "sweetalert2";
// Importar validator para validaciones de los campos del modal de final de orden
import validator from "validator";

//inicializar firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Definir colecciones
const productsCollection = collection(db, "productos");
const ordersCollection = collection(db, "ordenes");

// Crear contexto
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Load de productos desde Firestore
  useEffect(() => {
    cargarData();
  }, []);

  // Cargar el carrito desde localStorage
  useEffect(() => {
    const carritoLocalStorage =
      JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
  }, []);

  // Funcion de load de productos
  function cargarData() {
    getDocs(productsCollection)
      .then((snapshot) => {
        let arrayProductos = snapshot.docs.map((el) => el.data());
        setProductos(arrayProductos);
      })
      .catch((err) => console.error(err));
  }

  // Funcion de agregar al carrito
  function agregarAlCarrito(producto, cantidad) {
    const carritoActualizado = [...carrito];
    const productoEnCarrito = carritoActualizado.find(
      (p) => p.id === producto.id
    );

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      carritoActualizado.push({ ...producto, cantidad });
    }
    // Actualizar carrito
    setCarrito(carritoActualizado);
    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    // Mostrar aviso de producto agregado exitosamente
    Swal.fire({
      title: "Producto agregado",
      text: `${producto.nombre} ha sido agregado al carrito`,
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  // Funcion para eliminar los productos antes de comprar
  function eliminarDelCarrito(productoId) {
    const carritoActualizado = [...carrito];
    const productoEnCarrito = carritoActualizado.find(
      (p) => p.id === productoId
    );

    if (productoEnCarrito) {
      productoEnCarrito.cantidad -= 1;
      if (productoEnCarrito.cantidad === 0) {
        // Eliminar el producto del carrito si la cantidad llega a 0
        const index = carritoActualizado.indexOf(productoEnCarrito);
        carritoActualizado.splice(index, 1);
      }
      setCarrito(carritoActualizado);
      // Actualizar localStorage
      localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
    }
  }

  // Funcion de crear orden
  function crearOrden() {
    // modal para obtener los datos del comprador
    Swal.fire({
      title: "Información de contacto",
      html: `
        <p><b>Debe completar todos los campos</b></p>
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="mail" class="swal2-input" placeholder="Email">
        <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono">
      `,
      confirmButtonText: "Confirmar",
      focusConfirm: false,
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector("#nombre").value;
        const mail = Swal.getPopup().querySelector("#mail").value;
        const telefono = Swal.getPopup().querySelector("#telefono").value;
        // Validaciones previas a la creacion de la orden
        //falta mejorar la validaación del telefono y nombre
        if (!nombre || !mail || !telefono) {
          Swal.showValidationMessage(`Todos los campos son requeridos`);
          return false;
        }
        if (!validator.isEmail(mail)) {
          Swal.showValidationMessage(`El email ingresado no es válido`);
          return false;
        }
        if (!validator.isNumeric(telefono)) {
          Swal.showValidationMessage(`El teléfono debe contener solo números`);
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
              // Vaciar el carrito solo si la orden se confirma exitosamente
              setCarrito([]);
              localStorage.removeItem("carrito");
              Swal.fire({
                title: "Compra realizada con éxito",
                html: `Gracias por tu compra, su código de orden es: <b>${response.id}</b>`,
                icon: "success",
                confirmButtonText: "OK",
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                text: "Algo falló, intente más tarde",
                icon: "error",
                confirmButtonText: "OK",
              });
              console.error(err);
            });
        } else {
          Swal.fire({
            title: "Error",
            text: "Tu carrito está vacío!",
            icon: "error",
            confirmButtonText: "OK",
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
        eliminarDelCarrito,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
