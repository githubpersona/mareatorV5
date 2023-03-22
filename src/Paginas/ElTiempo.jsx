import React, { useEffect, useState, useRef } from 'react'
import Localizador from '../components/Localizador';
import PruebaGrafica from '../components/PruebaGrafica';
import TiempoAhora from '../components/TiempoAhora';
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';


const ElTiempo = () => {

    const fecha_actual = new Date();
    // const fecha_actual = new Date("Wed Feb 26 2023 22:30:44");

    const { localizacion } = useContext(UserContext);

    const url_web_tiempo = "https://open-meteo.com/en/docs#latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=temperature_2m,precipitation_probability,rain,cloudcover,windspeed_10m&timezone=Europe%2FBerlin";
    const url_json_tiempo = "https://api.open-meteo.com/v1/forecast?latitude=" + localizacion.latitud + "&longitude=" + localizacion.longitud + "&hourly=temperature_2m,precipitation_probability,rain,cloudcover,windspeed_10m&timezone=Europe%2FBerlin";

    return (
        <div>


            <TiempoAhora url={url_json_tiempo} />
            <PruebaGrafica url={url_json_tiempo} />


            <small className="mouse">
                Fuentes:
                <br />
                <a href={url_web_tiempo} target="_blank">Tiempo: Weather API de Open Meteo</a> -
                <a href={url_json_tiempo} target="_blank">json</a>
                <br />

                Otras:
                <a href="https://www.accuweather.com/es/es/a-coru%C3%B1a/307767/current-weather/307767" target="_blank">Accuweather</a>
                <br />
                GEO: lat: {localizacion.latitud} - long: {localizacion.longitud}
            </small>
        </div>
    );


};

export default ElTiempo