import React from 'react';
import { useState } from 'react';



// const Localizador = ({ setLatitud }, { latitud }) => {
const Localizador = (props) => {

    const localizaciones = {
        "localizacion": [{
            "id": 1,
            "nombre": "Coruña",
            "latitud": 43.3781,
            "longitud": -8.393,
            "estacion": 20
        },
        {
            "id": 2,
            "nombre": "Miño",
            "latitud": 43.3521,
            "longitud": -8.222,
            "estacion": 19
        },
        {
            "id": 3,
            "nombre": "Doniños",
            "latitud": 43.4969,
            "longitud": -8.324,
            "estacion": 18
        }]
    };
    console.log(localizaciones);
    const [latitud_aqui, setLatitud_aqui] = useState();
    const [longitud_aqui, setLongitud_aqui] = useState();
    // const [direccion, setDireccion] = useState("");

    const [direccion, setDireccion] = useState("");

    navigator.geolocation.getCurrentPosition(function (location) {
        setLatitud_aqui(location.coords.latitude);
        setLongitud_aqui(location.coords.longitude);
    });

    // fetch("https://nominatim.openstreetmap.org/search.php?q=" + props.latitu>d + "," + props.longitud + "&polygon_geojson=1&format=json")
    fetch("https://geocode.maps.co/reverse?lat=" + props.latitud + "&lon=" + props.longitud)
        .then(response => response.json())
        .then(j => {
            var array = j.display_name.split(',');
            setDireccion(array[4] + " - " + array[3] + " - " + array[2] + " (" + props.latitud + ", " + props.longitud + ")");
        });

    // function sayHello(name) {
    //     alert(`hello, ${name}`);
    // }

    function localizar(localizar_a) {
        // console.log(localizar_a);
        if (localizar_a == 0) {
            props.setLatitud(latitud_aqui);
            props.setLongitud(longitud_aqui);
        } else {
            props.setLatitud(localizaciones.localizacion[localizar_a - 1].latitud);
            props.setLongitud(localizaciones.localizacion[localizar_a - 1].longitud);
        }
    }

    return (
        <>
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
                                <button type="button" className="btn btn-info" onClick={() => localizar(0)}>Aquí</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Localizador