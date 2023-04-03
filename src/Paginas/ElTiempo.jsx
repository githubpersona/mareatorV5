import React, { useEffect, useState, useRef } from 'react'
import Localizador from '../components/Localizador';
import PruebaGrafica from '../components/PruebaGrafica';
import Tiempo from '../components/Tiempo';
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import Viento from '../components/Viento';


const ElTiempo = () => {

    const fecha_actual = new Date();
    // const fecha_actual = new Date("Wed Feb 26 2023 22:30:44");

    const { localizacion } = useContext(UserContext);

    const url_json_tiempo = "https://api.open-meteo.com/v1/forecast?latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=temperature_2m,precipitation_probability,rain,cloudcover,windspeed_10m&timezone=Europe%2FBerlin";

    const url_json_viento = "https://api.open-meteo.com/v1/forecast?latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=windspeed_10m,winddirection_10m&timezone=Europe%2FBerlin";

    return (
        <>
            <Tiempo url={url_json_tiempo} />
            <Viento url={url_json_viento} />
            <br></br>
        </>

    );


};

export default ElTiempo