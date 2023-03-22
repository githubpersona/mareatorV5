import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarAhora from '../Paginas/MarAhora'
import BarraMenu from '../components/BarraMenu';
import ElTiempo from '../Paginas/ElTiempo';
import Localizador from '../components/Localizador';


const AppRutas = () => {
    return (
        <Router>
            <BarraMenu />
            <Localizador  />
            <div className='container-fluid text-center'>
            <Routes>
                <Route exact path='/mar_ahora' element={<MarAhora />} />
                <Route exact path='/el_tiempo' element={<ElTiempo />} />


                <Route path="*" element={<MarAhora />} />
            </Routes>
            </div>
        </Router>
    )
}

export default AppRutas