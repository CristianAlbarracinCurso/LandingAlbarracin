import React from "react";

const ItemListContainer = (props) => {
  return (
    <div className="container justify-content-between align-items-center">
      <h5>{props.mensaje}</h5>
    </div>
  );
};

export default ItemListContainer;
