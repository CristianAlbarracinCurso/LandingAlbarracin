import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { useState } from "react";
import { useEffect } from "react";
import fetchData from "./fetchData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Contactos from "./components/Contactos";
import ItemDetail from "./components/ItemDetail";
import HomeMain from "./components/HomeMain";
import Cart from "./components/Cart";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchData()
      .then((response) => {
        setProductos(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeMain />} />

          <Route
            path="/productos"
            element={<ItemListContainer productos={productos} />}
          />
          <Route path="/Contactos" element={<Contactos />} />
          <Route path="/Cart" element={<Cart />} />
          <Route
            path="/detalle/:id"
            element={<ItemDetail productos={productos} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
