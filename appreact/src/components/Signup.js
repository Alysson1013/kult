import React from 'react'
import styles from './Signup.module.css'
import axios from 'axios'
import validator from 'validator';

const Signup = () => {
    const [error, setError] = React.useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        const name = document.getElementById('username').value
        const email = document.getElementById('email').value
        const describe = document.getElementById('describe').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirmPassword').value

        const verify = validator.equals(password, confirmPassword)
        if (!verify) setError("Passwords isn't equals.")
        else {
            const user = {
                username: name,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa6xEMnXTiiSThjDUX9PhsUUAh7YjnK1OF0w&usqp=CAU",
                email: email,
                describe: describe,
                password: password
            }

            try {
                const res = await axios.post("http://localhost:8080/profile/", user)
                if (res.status == 200){
                    window.location.href = "/"
                }
            } catch (error) {
                setError(error.response.data.err)
            }
        }
    }

    return (
        <form className={styles.box} onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="text" name="" id="username" required placeholder="Username" />
            <input type="email" name="" id="email" required placeholder="Email" />
            <input type="text" name="" id="describe" required placeholder="Describe" />
            <input type="password" name="" id="password" required placeholder="Password" />
            <input type="password" name="" id="confirmPassword" required placeholder="Confirm Passoword" />
            <input type="submit" name="" value="Send" />
            {error && <p>{error}</p>}
        </form>

    )
}

export default Signup
