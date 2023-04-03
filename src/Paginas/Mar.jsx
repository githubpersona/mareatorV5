import React, { useEffect, useState, useRef } from 'react'
import Cargando from '../components/Cargando';
import MareasAhora from '../components/MareasAhora';
import MareaGrafica from '../components/MareaGrafica';
import Oleaje from '../components/Oleaje';
import Tiempo from '../components/Tiempo';
import Viento from '../components/Viento';
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';


const Mar = () => {

    const fecha_actual = new Date();
    // const fecha_actual = new Date("Wed Feb 26 2023 22:30:44");

    const { localizacion } = useContext(UserContext);

    const url_json_oleaje = "https://marine-api.open-meteo.com/v1/marine?latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=wave_height,wave_direction,wave_period&timezone=Europe%2FBerlin";

    const url_json_viento = "https://api.open-meteo.com/v1/forecast?latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=windspeed_10m,winddirection_10m&timezone=Europe%2FBerlin";

    const url_json_mareas = "https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=" + localizacion.estacion + "&format=json";



    return (
        <div>
            {/* <MareasAhora url={url_json_mareas} /> */}
            <MareaGrafica url={url_json_mareas} />
            <Oleaje url={url_json_oleaje} />
            <Viento url={url_json_viento} />
            <br></br>
        </div>
    );


};

export default Mar