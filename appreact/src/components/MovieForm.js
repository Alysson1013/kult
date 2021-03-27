import React from 'react'
import styles from './MovieForm.module.css'
import { UserContext } from '../userStorage/userContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MovieForm = () => {
    const { id } = useParams()
    const [movie, setMovie] = React.useState(null)
    const { token } = React.useContext(UserContext)

    React.useEffect(() => {
        async function fetchMovie(url) {
            try {
                const response = await fetch(url)
                const json = await response.json()
                setMovie(json)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovie(`http://localhost:8080/movie/${id}`)
    }, [id])

    async function handleSubmit(event) {
        if (movie != null) {
            const title = document.getElementById("title").value
            const description = document.getElementById("description").value
            const genre = document.getElementById("genre").value
            const note = document.getElementById("note").value
            const thumb = document.getElementById("thumb").value
            const year = document.getElementById("year").value
            const movie_link = document.getElementById("movie_link").value
            const trailer_link = document.getElementById("trailer_link").value
            const duration = document.getElementById("duration").value
            const director = document.getElementById("director").value

            try {
                const response = await axios.put(`http://localhost:8080/movie/admin/${id}`, {
                    title: title,
                    description: description,
                    genre: genre,
                    note: note,
                    thumb: thumb,
                    year: year,
                    movie_link: movie_link,
                    trailer_link: trailer_link,
                    duration: duration,
                    director: director
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }
    if (movie == null) return null
    return (
        <div className={`card bg-dark ` + styles.card}>
            <div className={`card-header`}>
                Movie Editor
            </div>
            <div className={`card-body`}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control bg-dark text-white" id="title" defaultValue={movie[0].title} placeholder="" />
                    <br />
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control bg-dark text-white textarea" rows="3" id="description" value={movie[0].description} placeholder=""></textarea>
                    <br />
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control bg-dark text-white" id="genre" defaultValue={movie[0].genre} placeholder="" />
                    <br />
                    <label htmlFor="note" className="form-label">Note</label>
                    <input type="number" className="form-control bg-dark text-white" id="note" defaultValue={movie[0].note} placeholder="" />
                    <br />
                    <label htmlFor="thumb" className="form-label">Thumb</label>
                    <input type="text" className="form-control bg-dark text-white" id="thumb" defaultValue={movie[0].thumb} placeholder="" />
                    <br />
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="number" className="form-control bg-dark text-white" id="year" defaultValue={movie[0].year} placeholder="" />
                    <br />
                    <label htmlFor="movie_link" className="form-label">Movie Link</label>
                    <input type="text" className="form-control bg-dark text-white" id="movie_link" defaultValue={movie[0].movie_link} placeholder="" />
                    <br />
                    <label htmlFor="trailer_link" className="form-label">Trailer Link</label>
                    <input type="text" className="form-control bg-dark text-white" id="trailer_link" defaultValue={movie[0].trailer_link} placeholder="" />
                    <br />
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="number" className="form-control bg-dark text-white" id="duration" defaultValue={movie[0].duration} placeholder="" />
                    <br />
                    <label htmlFor="director" className="form-label">Director</label>
                    <input type="text" className="form-control bg-dark text-white" id="director" defaultValue={movie[0].director} placeholder="" />
                    <br />
                    <input type="submit" className="btn btn-secondary" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default MovieForm
