import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../userStorage/userContext'
import axios from 'axios'

const Header = () => {
    const { data } = React.useContext(UserContext)

    console.log(data)

    return (
        <nav className={"navbar navbar-dark bg-dark animate__animated animate__bounceInLeft " + styles.drop}>
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>

        </nav>
    )
}

export default Header
