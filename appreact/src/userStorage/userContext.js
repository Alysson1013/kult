import React from 'react';
import axios from 'axios'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
    const [user, setUser] = React.useState()
    const [error, setError] = React.useState(null)

    let axiosConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    console.log(axiosConfig)

    React.useEffect(() => {
        if (user == null) return null
        else {
            axios.post('http://localhost:8080/profile/login', user).then(response => {
                console.log(response)
                if (response.data.token) {
                    const token = response.data.token
                    const username = response.data.username
                    localStorage.setItem("token", token)
                    localStorage.setItem("username", username)
                    window.location.href = "/"
                } else {
                    setError("Username or password are invalid!")
                }
            })
        }
    }, [user])

    return (
        <UserContext.Provider value={{ error, setUser, axiosConfig }}>
            {children}
        </UserContext.Provider>
    )
}