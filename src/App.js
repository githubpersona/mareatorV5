import React from "react";
import AppRutas from "./Rutas/AppRutas";
import { useState } from "react";
import { UserContext } from "./Contexts/UserContext";
import { DatosLocalizacion } from "./Helpers/DatosLocalizacion";

const App = () => {
  // const [latitud, setLatitud] = useState("43.3781"); // (Coruña:
  // const [longitud, setLongitud] = useState("-8.393"); // Coruña
  // const [estacion, setEstacion] = useState("20"); // Coruña

  const [localizacion, setLocalizacion] = useState(
    DatosLocalizacion.localizacion[0]
  );
  const estado = { localizacion, setLocalizacion };

  return (
    <UserContext.Provider value={estado}>
      <AppRutas />
    </UserContext.Provider>
  );

  // return (
  //   <UserContext.Provider
  //     value={{
  //       latitud: [latitud, setLatitud],
  //       longitud: [longitud, setLongitud],
  //       estacion: [estacion, setEstacion],
  //     }}
  //   >
  //     <AppRutas />
  //   </UserContext.Provider>
  // );
};

export default App;
