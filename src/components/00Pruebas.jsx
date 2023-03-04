// ALGORITMO DE BÚSQUEDA DE MAREA DE REFERENCIA:

for (let i = puntos_marea_gmt.length - 1; i >= 0; i--) {
    marea = puntos_marea_gmt[i].tipo;
    hora = puntos_marea_gmt[i].hora;
    altura = puntos_marea_gmt[i].altura;
    console.log("Marea " + marea + " a las " + hora + ", de altura " + altura + "m. ");
    fecha_marea.setHours(hora.substring(0, 2), hora.substring(3, 5), 0);

    if (fecha_marea > fecha_actual) {
        // console.log("Fecha actual menor que:  " + fecha_marea.toString());
        indice_marea_referencia = i;
        // setFecha_marea_referencia(fecha_marea);
        fecha_marea_referencia = new Date(fecha_marea);
        console.log("si " + fecha_marea_referencia.toString());
    };
}

hourDiff = Math.abs((fecha_marea_referencia - fecha_actual) / 1000 / 60 / 60);

console.log("i" + indice_marea_referencia);

if ((puntos_marea_gmt[indice_marea_referencia].tipo).localeCompare("pleamar") == 0) {
    estado_marea_actual = "subiendo";
    nivel_marea_actual = 6 - hourDiff;
} else {
    estado_marea_actual = "bajando";
    nivel_marea_actual = hourDiff;
}