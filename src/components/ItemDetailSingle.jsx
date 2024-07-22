import "./ItemDetailSingle.css";

const Item = ({ nombre, precio, id, descripcion, categoria }) => {
  const url = `../img/${id}.png`;
  return (
    

      <div key={id} className="card-container">
        <h4 style={{ justifySelf: "center" }}>{nombre}</h4>
        <div>
        <img
        className="img"
        src={url}
      />
        </div>
        <p>
          Categoria: <b>{categoria}</b>
          <br />
          {descripcion} <br />
          Precio: <b>${precio}</b>
        </p>
        <button>Agregar al carrito</button>
      </div>
   
  );
};

export default Item;
