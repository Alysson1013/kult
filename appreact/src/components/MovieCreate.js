import React from 'react'
import styles from './MovieCreate.module.css'
import axios from 'axios'
import { UserContext } from '../userStorage/userContext'
import Head from './Head'

const MovieCreate = () => {
    const { token } = React.useContext(UserContext)

    console.log(token)

    async function handleSubmit(event) {
        event.preventDefault();

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

        axios.post("http://localhost:8080/movie/admin/", {
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
        }).then(() => window.location.href = "/manage").catch(err => console.log(err))
    }

    return (
        <div className={`card bg-dark ` + styles.card}>
            <Head title={`Kult | Manager`} />
            <div className={`card-header`}>
                Movie Editor
            </div>
            <div className={`card-body`}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control bg-dark text-white" id="title" required placeholder ="" />
                    <br />
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control bg-dark text-white textarea" rows="3" id="description" required placeholder =""></textarea>
                    <br />
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control bg-dark text-white" id="genre" required placeholder ="" />
                    <br />
                    <label htmlFor="note" className="form-label">Note</label>
                    <input type="number" className="form-control bg-dark text-white" id="note" required placeholder ="" />
                    <br />
                    <label htmlFor="thumb" className="form-label">Thumb</label>
                    <input type="text" className="form-control bg-dark text-white" id="thumb" required placeholder ="" />
                    <br />
                    <label htmlFor="year" className="form-label">Year</label>
                    <input type="number" className="form-control bg-dark text-white" id="year" required placeholder ="" />
                    <br />
                    <label htmlFor="movie_link" className="form-label">Movie Link</label>
                    <input type="text" className="form-control bg-dark text-white" id="movie_link" required placeholder ="" />
                    <br />
                    <label htmlFor="trailer_link" className="form-label">Trailer Link</label>
                    <input type="text" className="form-control bg-dark text-white" id="trailer_link" required placeholder ="" />
                    <br />
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input type="number" className="form-control bg-dark text-white" id="duration" required placeholder ="" />
                    <br />
                    <label htmlFor="director" className="form-label">Director</label>
                    <input type="text" className="form-control bg-dark text-white" id="director" required placeholder ="" />
                    <br />
                    <input type="submit" className="btn btn-secondary" value="Send" />
                </form>
            </div>
        </div>
    )
}

export default MovieCreate
