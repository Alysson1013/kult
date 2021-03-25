import React from 'react'
import { UserContext } from '../userStorage/userContext'
import styles from './Profile.module.css'

const Profile = () => {
    const { data } = React.useContext(UserContext) 

    if (data == null) return null
    return (
        <div className={"card text-white bg-dark mb-3 " + styles.card} style={{ width: '30rem' }}>
            <img src={data.avatar} className="card-img-top" alt="..." />
            <div className="card-body ">
                <h1>
                    {data.username}
                </h1>
                <p>
                    {data.describe}
                </p>
            </div>
        </div>

    )
}


export default Profile
