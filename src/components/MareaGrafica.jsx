import React, { useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js'
import 'chart.js/auto';

const MareaGrafica = (props) => {

    const fecha_actual = new Date();
    // const fecha_actual = new Date("Wed Feb 26 2023 22:30:44");

    const horas_hoy = fecha_actual.getHours();

    // const [texto, setTexto] = useState("");

    // const [direccion_marea, setDireccionMarea] = useState("");
    const [altura_marea, setAlturaMarea] = useState("");
    const [hora_marea, setHoraMarea] = useState("");

    const flecha_marea = useRef(null);
    let marea_referencia;

    let puntos_marea = [];
    let puntos_grafica_marea = {
        horas: [],
        alturas: []
    };


    Chart.register(...registerables);
    const grafica_marea = useRef(null);
    const [chart_marea, setChart_marea] = useState(null);
    let ctx = null;

    // const [cargando, setCargando] = useState(true);

    const estilo_1linea = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "5px",
        'fontSize': "22px",
        fontFamily: "Sans-Serif"
    };

    const estilo_centradoimagen = {
        position: 'relative',
        top: '50%',
        left: '50%',
        // transform: translate('-50%', '-50%'),
    };

    const estilo_micro = {
        'fontSize': "7px",
        fontFamily: "Sans-Serif"
    };

    const recolectar_mareas = () => {

        fetch(props.url)
            .then((respuesta) => {
                return respuesta.json()
            })
            .then((data) => {
                console.log("fetch Mareas...");

                // // console.log(data);
                // setCargando(true);

                // setCargando(false);
                let texto = "";

                // let fecha_marea_referencia = new Date();
                let nivel_marea_actual = "desconocido";
                let indice_marea_referencia = 0;
                let estado_marea_actual = "desconocido";

                let marea, hora, hora2, altura;
                let fecha_marea, hoy = new Date();
                let hourDiff;

                let puntos_marea_gmt = data.mareas.datos.marea;

                let flecha_marea_direccion = 0;

                // console.log(puntos_marea_gmt);
                // PASAMOS LAS FECHAS DE LOS PUNTOS DE MAREA DE GMT A CEST
                for (let i = puntos_marea_gmt.length - 1; i >= 0; i--) {
                    marea = puntos_marea_gmt[i].tipo;
                    hora = puntos_marea_gmt[i].hora;
                    altura = puntos_marea_gmt[i].altura;
                    // console.log("Marea " + marea + " a las " + hora);
                    fecha_marea = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hora.substring(0, 2), hora.substring(3, 5), 0, 0));
                    // console.log("fecha_marea : " + fecha_marea);
                    // debugger;
                    // console.log("CEST: " + fecha_marea.toLocaleString('es-ES',));
                    // puntos_marea[i] = fecha_marea;

                    puntos_marea = [{ fecha_marea, marea, altura }].concat(puntos_marea); // [ 4, 3, 2, 1 ]
                }

                console.log(puntos_marea);


                // debugger;
                // Obtenemos el objeto date de la marea más tardía
                indice_marea_referencia = puntos_marea.length - 1;
                marea_referencia = puntos_marea[indice_marea_referencia];

                // debugger;


                // // // CALCULAR ESTADO Y NIVEL DE MAREA

                // Si ya pasó la marea más tardía, se calcula con respecto a ésta (M4)
                if (fecha_actual > marea_referencia.fecha_marea) {
                    // console.log("- Ya pasó la tardia, se calcula con respecto a ésta (M4)")
                    hourDiff = Math.abs((marea_referencia.fecha_marea - fecha_actual) / 1000 / 60 / 60);
                    // setFecha_marea_referencia(fecha_marea);

                    if (marea_referencia.marea == "pleamar") {
                        estado_marea_actual = "bajando";
                        nivel_marea_actual = 6 - hourDiff;
                        marea_referencia.marea = "BAJA";
                        flecha_marea_direccion = 180;
                    } else {
                        estado_marea_actual = "subiendo";
                        nivel_marea_actual = hourDiff;
                        marea_referencia.marea = "ALTA";
                    }
                    marea_referencia.fecha_marea.setTime(marea_referencia.fecha_marea.getTime() + (6 * 60 * 60 * 1000));

                    // Si no, buscar la marea inmediatamente superior y calcular con respecto a ésta
                } else {
                    // console.log("- Calculamos la superior")

                    for (let i = puntos_marea.length - 1; i >= 0; i--) {
                        if (puntos_marea[i].fecha_marea > fecha_actual) {
                            // indice_marea_referencia = i;
                            marea_referencia.fecha_marea = puntos_marea[i].fecha_marea;
                            marea_referencia.marea = puntos_marea[i].marea;
                        }
                    }

                    hourDiff = Math.abs((marea_referencia.fecha_marea - fecha_actual) / 1000 / 60 / 60);
                    if (marea_referencia.marea == "pleamar") {
                        estado_marea_actual = "subiendo";
                        nivel_marea_actual = 6 - hourDiff;
                        marea_referencia.marea = "ALTA";

                    } else {
                        estado_marea_actual = "bajando";
                        nivel_marea_actual = hourDiff;
                        marea_referencia.marea = "BAJA";
                        flecha_marea_direccion = 180;
                    }


                }

                nivel_marea_actual = Number.parseFloat(nivel_marea_actual).toFixed(1);

                texto += "Marea " + estado_marea_actual + "  Nivel: " + nivel_marea_actual + " - Hora de marea " + marea_referencia.marea + ": " + String(marea_referencia.fecha_marea.getHours()).padStart(2, '0') + ":" + String(marea_referencia.fecha_marea.getMinutes()).padStart(2, '0');

                // debugger;

                flecha_marea.current.style.transform = "rotate(" + flecha_marea_direccion + "deg)";

                flecha_marea.current.height = 50;
                flecha_marea.current.width = 40;

                setAlturaMarea(nivel_marea_actual);
                setHoraMarea(String(marea_referencia.fecha_marea.getHours()).padStart(2, '0') + ":" + String(marea_referencia.fecha_marea.getMinutes()).padStart(2, '0'));

                // setTexto(texto);
                // console.log(texto)

                // puntos_grafica_marea.horas = Array(74).fill('10');
                // puntos_grafica_marea.alturas = Array(74).fill(1);
                debugger;
                let z = 0;
                let grados_iniciales = 0;
                let i = 0;
                let hora_inicial = 1;
                for (let i = 0; i <= puntos_marea.length - 1; i++) {

                    let a = Math.abs(puntos_marea[i].altura - 2.13);

                    puntos_grafica_marea.horas[z] = hora_inicial;
                    puntos_grafica_marea.alturas[z] = puntos_marea[i].altura;
                    if (puntos_marea[i].marea == 'bajamar') {
                        grados_iniciales = 270;
                    } else {
                        grados_iniciales = 90;
                    }
                    for (let y = 1; y < 89; y++) {
                        let radianes = (grados_iniciales + y) * Math.PI / 180;
                        puntos_grafica_marea.horas[z + y] = hora_inicial + y;
                        puntos_grafica_marea.alturas[z + y] = 2.13 + (a * Math.sin(radianes));
                    }
                    for (let y = 90; y < 179; y++) {
                        let radianes = (grados_iniciales + y) * Math.PI / 180;
                        puntos_grafica_marea.horas[z + y] = hora_inicial + y;
                        puntos_grafica_marea.alturas[z + y] = 2.13 + (a * Math.sin(radianes));
                    }
                    z = z + 180;
                }

                console.log(puntos_grafica_marea);

                debugger;

                // makeChart_marea();

            });

    }

    recolectar_mareas();

    function makeChart_marea() {
        ctx = grafica_marea.current;
        if (chart_marea) {
            setChart_marea(null);
        }
        setChart_marea(new Chart(ctx, {
            type: 'line',
            data: {
                // labels: puntos_grafica_marea.horas.slice(horas_hoy, 73),
                labels: puntos_grafica_marea.horas,

                datasets: [
                    {
                        data: puntos_grafica_marea.alturas,
                        pointStyle: 'circle',
                        pointRadius: 2,
                        pointHoverRadius: 2,
                        yAxisID: 'y',
                        // pointBackgroundColor: datos.colores.slice(horas_hoy, 73),
                    },
                    // {
                    //     type: 'bar',
                    //     data: Array(datos.colores.slice(horas_hoy, 73).length).fill(1),
                    //     yAxisID: 'y1',
                    //     backgroundColor: datos.colores_columnas.slice(horas_hoy, 73),
                    //     barPercentage: 1,
                    //     categoryPercentage: 1,


                    // },
                ],
            },
            options: {

                events: ['click'],
                // borderWidth: 4,
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Altura de marea (m)',
                        },
                        // max: 70,
                        // min: 0,
                        // ticks: {
                        //     stepSize: 5
                        // }
                    },
                    // y1: {
                    //     display: false,
                    // },
                }
            }
        }));

    }

    return (
        <>
            <div className="card m-2" style={{ width: "100%", }}>
                {/* {cargando && <Cargando />} */}
                <table cellSpacing="0" cellPadding="0">
                    <tbody>

                        <tr>
                            <td style={{ width: "20%", }}>
                                <img src='imagenes/bola_marea_luna.png' style={{ width: "3rem", }} />
                            </td>
                            <td>
                                <div style={estilo_1linea}>{altura_marea}</div>
                            </td>
                            <td>
                                <img src='imagenes/flecha_marea.png' ref={flecha_marea} style={{ width: "2rem", height: "2rem" }} />
                            </td>
                            <td>
                                <div style={estilo_1linea}>{hora_marea}</div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            {/* <div className="card m-2" style={{ width: "100%", }}>

                <canvas ref={grafica_marea}></canvas>


            </div> */}
        </>

    );


};

export default MareaGrafica