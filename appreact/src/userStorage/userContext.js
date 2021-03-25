import React from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
    const [user, setUser] = React.useState()
    const [error, setError] = React.useState(null)
    const [token, setToken] = React.useState(localStorage.getItem('token'))
    const [data, setData] = React.useState(null)

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

    React.useEffect(() => {
        if (token != null){
            const decoded = jwt_decode(token)

            axios.get(`http://localhost:8080/profile/${decoded.id}`)
                .then(response => setData(response.data[0]))
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <UserContext.Provider value={{ error, setUser, token, data }}>
            {children}
        </UserContext.Provider>
    )
}