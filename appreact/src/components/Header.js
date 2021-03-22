import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <nav className={"navbar navbar-dark bg-dark animate__animated animate__bounceInLeft " + styles.drop}>
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>
            <div className={"dropdown animate__animated animate__bounce animate__bounceInLeft "+ styles.buttons}>
                <NavLink to="/">
                    <button class="btn btn-outline-success me-2" type="submit">Sign In</button>
                </NavLink>
                <NavLink to="/signup">
                    <button class="btn btn-outline-danger me-2" type="submit">Sign Up</button>
                </NavLink>
            </div>
        </nav>
    )
}

export default Header
