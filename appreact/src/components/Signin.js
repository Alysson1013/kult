import React from 'react'
import styles from './Signin.module.css'

const Signin = () => {
    

    return (
        <form className={styles.box}>
            <h1>Sign Up</h1>
            <input type="email" name="" id="email" required placeholder="Email" />
            <input type="password" name="" id="password" required placeholder="Password" />
            <input type="submit" name="" value="Login" />
        </form>
    )
}

export default Signin
