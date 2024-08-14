import "./HomeMain.css";

const HomeMain = () => {
  return (
    <div className="home-container">
      <video className="background-video" loop autoPlay muted playsInline>
        <source src="./01.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>
      <div className="content">
        <h1>Bienvenido a Info Store.</h1>
        <p>Insumos y Servicios informáticos a su medida.</p>
      </div>
    </div>
  );
};

export default HomeMain;
