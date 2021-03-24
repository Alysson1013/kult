import React from 'react';
import axios from 'axios';


export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
    const [user, setUser] = React.useState()
    const [error, setError] = React.useState(null)
    const [token, setToken] = React.useState(localStorage.getItem('token'))

    React.useEffect(() => {
        if (user == null) return null
        else {
            axios.post('http://localhost:8080/profile/login', user).then(response => {
                if (response.data.token) {
                    setToken(response.data.token)
                    localStorage.setItem('token', token)
                    if (token != null) window.location.href = "/"
                } else {
                    setError("Username or password are invalid!")
                }
            })
        }

    }, [user, token])

    return (
        <UserContext.Provider value={{ error, setUser, token }}>
            {children}
        </UserContext.Provider>
    )
}