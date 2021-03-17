import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark ">
            <NavLink className={"navbar-brand navbar-expand-lg " + styles.logo} to="/" end>Kult</NavLink>


            <div className={"dropdown " + styles.drop}>
                <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                    Provisório
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                    <li className={styles.item}>Minha conta</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className={styles.item}><span className={styles.danger}>Excluir Conta</span></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
