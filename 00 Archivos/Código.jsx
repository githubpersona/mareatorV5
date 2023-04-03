
// - Chartjs: imagen como punto 

var sun = new Image();
sun.src = 'https://i.imgur.com/yDYW1I7.png';


data: {
    datasets: [
        {
            data: datos.windspeed_10m.slice(horas_hoy, 73),
            pointStyle: 'circle',
            pointRadius: 4,
            pointStyle: sun,