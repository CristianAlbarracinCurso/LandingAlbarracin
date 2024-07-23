
import logoCarrito from "../assets/logoCarrito2.png";

const CartWidget = () => {
 
  return (
    <>
      <span className="badge badge-light">
        <img src={logoCarrito} alt="Logo" width="45px" />
 
      </span>
    </>
  );
};

export default CartWidget;
