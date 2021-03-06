import React from 'react'
import styles from './Signin.module.css'
import { UserContext } from '../userStorage/userContext'
import Head from './Head'

const Signin = () => {
    const { setUser, error } = React.useContext(UserContext);

    function login(event){
        event.preventDefault()

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        setUser({
            email: email, 
            password: password
        })   
    }

    return (
        <form className={styles.box} onSubmit={login}>
            <Head title={`Kult | Sign in`} />
            <h1>Sign Up</h1>
            <input type="email" name="" id="email" required placeholder="Email" />
            <input type="password" name="" id="password" required placeholder="Password" />
            <input type="submit" name="" value="Login" />
            {error && <p>{error}</p>}
        </form>
    )
}

export default Signin
