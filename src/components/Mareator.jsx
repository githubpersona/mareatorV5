import { useState } from "react";
import MarAhora from "./MarAhora";

const Mareator = () => {

    return (
        <div>
            <table cellSpacing="0" cellPadding="0" style={{ width: "100%", }}>
                <tbody>
                    <tr>
                        <td style={{ width: "50%", }}>
                            <h1>Mareator 0.4.4</h1>
                        </td>
                        <td>
                            Lapp para hacer la práctica
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <MarAhora />
        </div>
    );


};

export default Mareator;

// function msToTime(duration) {
//     var milliseconds = Math.floor((duration % 1000) / 100),
//     seconds = Math.floor((duration / 1000) % 60),
//     minutes = Math.floor((duration / (1000 * 60)) % 60),
//     hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

//   hours = (hours < 10) ? "0" + hours : hours;
//   minutes = (minutes < 10) ? "0" + minutes : minutes;
//   seconds = (seconds < 10) ? "0" + seconds : seconds;

//   return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
// }
// console.log(msToTime(300000))