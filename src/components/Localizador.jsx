import React from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import { DatosLocalizacion } from "../Helpers/DatosLocalizacion";


// const Localizador = ({ setLatitud }, { latitud }) => {
const Localizador = () => {

    // const { latitud, setLatitud } = useContext(UserContext);
    // const { longitud, setLongitud } = useContext(UserContext);
    // const { estacion, setEstacion } = useContext(UserContext);

    const { localizacion, setLocalizacion } = useContext(UserContext);

    const [latitud_aqui, setLatitud_aqui] = useState();
    const [longitud_aqui, setLongitud_aqui] = useState();
    // const [direccion, setDireccion] = useState("");

    const [direccion, setDireccion] = useState("");

    navigator.geolocation.getCurrentPosition(function (location) {
        setLatitud_aqui(location.coords.latitude);
        setLongitud_aqui(location.coords.longitude);
    });

    // fetch("https://nominatim.openstreetmap.org/search.php?q=" + props.latitu>d + "," + props.longitud + "&polygon_geojson=1&format=json")
    fetch("https://geocode.maps.co/reverse?lat=" + localizacion.latitud + "&lon=" + localizacion.longitud)
        .then(response => response.json())
        .then(j => {
            var array = j.display_name.split(',');
            setDireccion(array[4] + " - " + array[3] + " - " + array[2] + " (" + localizacion.latitud + ", " + localizacion.longitud + ")");
        });

    // function sayHello(name) {
    //     alert(`hello, ${name}`);
    // }

    function localizar(localizar_a) {
        // console.log(localizar_a);

        if (localizar_a == 0) {
            let localizacion_temp = localizacion;
            localizacion_temp.latitud = latitud_aqui;
            localizacion_temp.longitud = longitud_aqui;
            setLocalizacion(localizacion_temp);
        } else {
            // let temp = latitud;
            // temp[0] = localizaciones.localizacion[localizar_a - 1].latitud.toString();
            // setLatitud(temp);
            // temp = longitud;
            // temp[0] = localizaciones.localizacion[localizar_a - 1].longitud.toString();
            // setLongitud(temp);
            setLocalizacion(DatosLocalizacion.localizacion[localizar_a - 1]);
        }
    }

    return (
        <>
        {/* <UserContext.Consumer> */}

            <div className="alert alert-info" role="alert">
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <td style={{ width: "20%", }}>
                                Direccion actual:
                            </td>
                            <td style={{ width: "60%", }}>
                                {direccion}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="container">
                <table cellSpacing="0" cellPadding="0" style={{ width: "100%", }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "25%", }}>
                                <button type="button" className="btn btn-info" onClick={() => localizar(1)}>Coruña</button>
                            </td>
                            <td style={{ width: "25%", }}>
                                <button type="button" className="btn btn-info" onClick={() => localizar(2)}>Miño</button>
                            </td>
                            <td style={{ width: "25%", }}>
                                <button type="button" className="btn btn-info" onClick={() => localizar(3)}>Doniños</button>
                            </td>
                            <td style={{ width: "25%", }}>
                                <button type="button" className="btn btn-info" onClick={() => localizar(4)}>Barmouth</button>
                            </td>
                            <td style={{ width: "25%", }}>
                                <button type="button" className="btn btn-info" onClick={() => localizar(0)}>Aquí</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* </UserContext.Consumer> */}

        </>
    )
}

export default Localizador