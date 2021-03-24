import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const username = localStorage.getItem('username')
    let rightIcons = null


    function handleClick(){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href = "/"
    }

    if (username == null) {
        rightIcons = (
            <div className={"dropdown animate__animated animate__bounce animate__bounceInLeft " + styles.buttons}>
                <NavLink to="/signin">
                    <button class="btn btn-outline-success me-2" type="submit">Sign In</button>
                </NavLink>
                <NavLink to="/signup">
                    <button class="btn btn-outline-danger me-2" type="submit">Sign Up</button>
                </NavLink>
            </div>
        )
    } else {
        rightIcons = (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                    <li><a className="dropdown-item active" href="#">My account</a></li>
                    <li><a className="dropdown-item" href="#">Delete account</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li onClick={handleClick}><a className="dropdown-item" href="#">Exit</a></li>
                </ul>
            </div>

        )
    }

    return (
        <nav className={"navbar navbar-dark bg-dark animate__animated animate__bounceInLeft " + styles.drop}>
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>

            {rightIcons}
        </nav>
    )
}

export default Header
