import React from "react";
import AppRutas from "./Rutas/AppRutas";
import Pie from "./components/Pie";
import { useState } from "react";
import { UserContext } from "./Contexts/UserContext";
import { DatosLocalizacion } from "./Helpers/DatosLocalizacion";

const App = () => {
  const version = "0.4.9.4 zarza";
  if (localStorage.getItem("localizacion_local") === null) {
    localStorage.setItem(
      "localizacion_local",
      JSON.stringify(DatosLocalizacion.localizacion[0])
    );
  }
  const local_temp = JSON.parse(localStorage.getItem("localizacion_local"));
  const [localizacion, setLocalizacion] = useState(local_temp);
  const estado = { localizacion, setLocalizacion };

  return (
    <UserContext.Provider value={estado}>
      <AppRutas />
      <Pie version={version} />
    </UserContext.Provider>
  );
};

export default App;
