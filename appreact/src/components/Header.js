import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../userStorage/userContext'
import axios from 'axios'
import jwt_decode from "jwt-decode";

const Header = () => {
    const global = React.useContext(UserContext)
    const [data, setData] = React.useState(null)
    const [right, setRight] = React.useState(
        <div className={"dropdown animate__animated animate__bounce animate__bounceInLeft " + styles.buttons}>
            <NavLink to="/signin">
                <button class="btn btn-outline-success me-2" type="submit">Sign In</button>
            </NavLink>
            <NavLink to="/signup">
                <button class="btn btn-outline-danger me-2" type="submit">Sign Up</button>
            </NavLink>
        </div>
    )

    function handleClick(){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        window.location.href = "/"
    }

    React.useEffect(() => {
        console.log(global)
        if (global.token != null) {
            const decoded = jwt_decode(global.token)

            axios.get(`http://localhost:8080/profile/${decoded.id}`)
                .then(response => console.log(response.data))
                .catch(err => console.log(err))

            setRight(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Teste
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
    }, [])


    return (
        <nav className={"navbar navbar-dark bg-dark animate__animated animate__bounceInLeft " + styles.drop}>
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>

            {right}
        </nav>
    )
}

export default Header
