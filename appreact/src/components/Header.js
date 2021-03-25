import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../userStorage/userContext'

const Header = () => {
    const { data } = React.useContext(UserContext)
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

    React.useEffect(() => {
        if (data != null) {
            setRight(
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        {data.username}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li><NavLink to={`profile/${data.id}`} className="dropdown-item">My account</NavLink></li>
                        <li><a className="dropdown-item">Delete account</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li onClick={handleClick}><a className="dropdown-item" href="#">Exit</a></li>
                    </ul>
                </div>
            )
        }
    }, [data])

    function handleClick() {
        localStorage.removeItem('token')
        window.location.href = "/"
    }

    return (
        <nav className={"navbar navbar-dark bg-dark animate__animated animate__bounceInLeft " + styles.drop}>
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>

            {right}
        </nav>
    )
}

export default Header
