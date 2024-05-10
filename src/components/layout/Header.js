import React from 'react'

import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='header'>
        {/*Span del logo de header*/}
        <div className='logo'>
            <h3>Miguel Alan Quintana</h3>
        </div>
        {/*Usamos nav y una lista no ordenada para listar los sitios de nuestro header y creando el acceso directo usando navLink.*/}
        <nav>
            <ul>
                <li>
                    <NavLink to='/inicio' className={({isActive}) => isActive ? "active" : ""}>Venta</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard' className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
                </li>
                <li>
                <NavLink to='/invoices' className={({isActive}) => isActive ? "active" : ""}>Facturas</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}
