import img404 from "/img/404.png";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  
  return (
    <div className="coontainerNotF"> 
      <div><img src={img404} className="imgNotF"/>
        </div>
      <Link to="../">
        <button>Escapar</button>
      </Link>
    </div>
  );
};

export default NotFound;
