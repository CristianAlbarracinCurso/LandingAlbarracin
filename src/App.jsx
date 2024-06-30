import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import SiteFooter from "./components/SiteFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
        <ItemListContainer mensaje="Items List Container 1" />
        <ItemListContainer mensaje="Items List Container 2" />
        <SiteFooter />
      </div>
    </>
  );
}

export default App;
