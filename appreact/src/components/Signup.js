import React from 'react'
import styles from './Signup.module.css'
import axios from 'axios'

const Signup = () => {
    function handleSubmit(event){
        event.preventDefault()
    }

    return (
        <form className={styles.box} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="text" name="" id="name" placeholder="Username" />
            <input type="email" name="" id="email" placeholder="Email" />
            <input type="text" name="" id="describe" placeholder="Describe" />
            <input type="password" name="" id="password" placeholder="Password" />
            <input type="password" name="" id="confirmPassword" placeholder="Confirm Passoword" />
            <input type="submit" name="" value="Send" />
        </form>

    )
}

export default Signup
