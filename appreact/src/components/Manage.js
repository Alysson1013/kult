import React from 'react'
import styles from './Manage.module.css'
import axios from 'axios'
import { UserContext } from '../userStorage/userContext'
import { NavLink } from 'react-router-dom'

const Manage = () => {
    const [movies, setMovies] = React.useState(null)
    const { token } = React.useContext(UserContext)

    async function deleteMovie({ target }) {
        try {
            const response = await axios.delete("http://localhost:8080/movie/admin", {
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    id: target.value
                }
            })
            let { data } = await axios.get("http://localhost:8080/movie")
            setMovies(data)
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }

    async function addMovie() {
        window.location.href = "/new/movie"
    }

    React.useEffect(() => {
        async function getMovies() {
            try {
                let { data } = await axios.get("http://localhost:8080/movie")
                setMovies(data)
            } catch (error) {
                console.log(error)
            }
        }
        getMovies()
    }, [])

    if (movies == null) return null
    return (
        <div>
            <table className={"table table-dark " + styles.table}>
                <thead>
                    <button onClick={addMovie} className={"btn btn-secondary"}>Adicionar Filme</button>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr>
                            <td>
                                {movie.id}
                            </td>
                            <td>
                                {movie.title}
                            </td>
                            <td>
                                <NavLink to={`/edit/movie/${movie.id}`}>
                                    <button className={"btn btn-warning " + styles.button}>
                                        Edit
                                    </button>
                                </NavLink>
                                <button className={"btn btn-danger " + styles.button} onClick={deleteMovie} value={movie.id}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Manage
