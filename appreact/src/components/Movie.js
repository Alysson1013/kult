import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from "react-player"
import styles from './Movie.module.css'

const Movie = () => {
    const [movie, setMovie] = React.useState(null)
    const [error, setError] = React.useState(false)
    const { id } = useParams()

    React.useEffect(() => {
        async function fetchMovie(url) {
            try {
                const response = await fetch(url)
                const json = await response.json()
                setMovie(json)
            } catch (error) {
                setError("Um erro ocorreu")
            }
        }
        fetchMovie(`http://localhost:8080/movie/${id}`)
    }, [id])

    if (error) return <p>{error}</p>
    if (movie == null) return null
    return (
        <div>
            <h1 className={styles.title}>
                {movie[0].title}
            </h1>
            <div className={styles.video}>
                <ReactPlayer
                    url={movie[0].movie_link}
                    controls='true' 
                />
            </div>
        </div>
    )
}

export default Movie
