import React from 'react'
import styles from './Manage.module.css'
import axios from 'axios'
import { UserContext } from '../userStorage/userContext'
import { NavLink } from 'react-router-dom'

const Manage = () => {
    const [movies, setMovies] = React.useState(null)
    const [users, setUsers] = React.useState(null)
    const [reviews, setReviews] = React.useState(null)
    const { token } = React.useContext(UserContext)

    async function deleteMovie({ target }) {
        try {
            await axios.delete("http://localhost:8080/movie/admin", {
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    id: target.value
                }
            })
            let { data } = await axios.get("http://localhost:8080/movie")
            setMovies(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteUser({ target }) {
        try {
            await axios.delete("http://localhost:8080/user/admin", {
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    id: target.value
                }
            })
            let { data } = await axios.get("http://localhost:8080/user/admin/", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            setUsers(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteReview({ target }) {
        try {
            await axios.delete("http://localhost:8080/review/admin", {
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    id: target.value
                }
            })
            let { data } = await axios.get("http://localhost:8080/review/")
            setReviews(data)
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

    React.useEffect(() => {
        async function getUsers() {
            try {
                let { data } = await axios.get("http://localhost:8080/user/admin/", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])

    React.useEffect(() => {
        async function getReviews() {
            try {
                let { data } = await axios.get("http://localhost:8080/review")
                setReviews(data)
            } catch (error) {
                console.log(error)
            }
        }
        getReviews()
    }, [])

    if (movies == null) return null
    if (users == null) return null
    if (reviews == null) return null
    return (
        <div>
            <table className={"table table-dark " + styles.table}>
                <thead>
                    <p>Movies</p>
                    <button onClick={addMovie} className={"btn btn-secondary"}>Adicionar Filme</button>
                    <br />
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
            <table className={"table table-dark " + styles.table}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr>
                            <td>
                                {user.id}
                            </td>
                            <td>
                                {user.username}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                <button className={"btn btn-danger " + styles.button} onClick={deleteUser} value={user.id}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table className={"table table-dark " + styles.table}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr>
                            <td>
                                {review.id}
                            </td>
                            <td>
                                {review.title}
                            </td>
                            <td>
                                <button className={"btn btn-danger " + styles.button} onClick={deleteReview} value={review.id}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Manage
