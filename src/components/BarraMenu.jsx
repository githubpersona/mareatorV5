import React from 'react'
import { NavLink } from 'react-router-dom'

const BarraMenu = () => {
    return (
        <nav className='navbar navbar-expand navbar-dark bg-info'>
            <div className='container-fluid'>
                <h2 className="navbar-brand" href="#"> Mareator 0.4.6.1 alfa </h2>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='#navbarSupportedContent'
                    aria-expanded='false'
                    aria-label="Toggle navigation"
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className="navbar-item">
                            <NavLink className="nav-link" aria-current='page' to='/mar_ahora'>
                                Mar Ahora <span className="sr-only"></span>
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="nav-link" aria-current='page' to='/el_tiempo'>
                                El tiempo <span className="sr-only"></span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default BarraMenu