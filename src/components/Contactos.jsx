import { useState } from "react";
import "./Contactos.css";

const countries = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Guyana",
  "Paraguay",
  "Perú",
  "Surinam",
  "Uruguay",
  "Venezuela",
];

const Contactos = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    country: "",
    phone: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
   <div  className="container" >
   <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Datos de Contacto</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>País:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div > 
          <label>Mensaje:</label>
          <textarea
          className="form-control"
            type="text"
            name="msj"
            rows="6"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
    </div>
  );
};

export default Contactos;
