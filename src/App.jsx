import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Contactos from "./components/Contactos";
import ItemDetail from "./components/ItemDetail";
import HomeMain from "./components/HomeMain";
import Cart from "./components/Cart";
import { ContextProvider } from "./components/Context/Context";
import Footer from "./components/SiteFooter"

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/Contactos" element={<Contactos />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/detalle/:id" element={<ItemDetail />} />

          <Route path="*" element={<NotFound />} />
          
        </Routes>
        
      </BrowserRouter>
      <Footer/>
    </ContextProvider>
   

  );
}

export default App;
