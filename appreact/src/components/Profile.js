import React from 'react'
import { UserContext } from '../userStorage/userContext'
import styles from './Profile.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { data } = React.useContext(UserContext)
    const [user, setUser] = React.useState(data)
    const { id } = useParams()

    console.log("Aqui" + id)

    React.useEffect(() => {
        if (id != undefined) {
            console.log("O id " + id)
            axios.get(`http://localhost:8080/profile/${id}`)
                .then(response => setUser(response.data[0]))
                .catch(err => console.log(err))
        }
    }, [])

    if (user == null) return null
    return (
        <div className={"card text-white bg-dark mb-3 animate__animated animate__bounceInLeft " + styles.card} style={{ width: '30rem' }}>
            <img src={user.avatar} className="card-img-top" alt="..." />
            <div className="card-body ">
                <h1>
                    {user.username}
                </h1>
                <p>
                    {user.describe}
                </p>
            </div>
        </div>

    )
}


export default Profile
