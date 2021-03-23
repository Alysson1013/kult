import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from "react-player"
import styles from './Movie.module.css'
import Slider from './Slider'
import StarRatings from 'react-star-ratings';
import Head from './Head'

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

    console.log(movie)
    if (error) return <p>{error}</p>
    if (movie == null) return null
    return (
        <div>
            <Head title={`Kult | ${movie[0].title}`} />
            <h1 className={styles.title + " lide animate__animated animate__bounceInLeft"}>
                {movie[0].title}
            </h1>
            <div className={styles.video}>
                <ReactPlayer
                    url={movie[0].movie_link}
                    controls='true'
                />
            </div>
            <div className={styles.info}>
                <div className={styles.stars + " animate__animated animate__bounceInLeft"}>
                    <StarRatings
                        rating={movie[0].note / 2}
                        starDimension="40px"
                        starSpacing="15px"
                        numberOfStars={5}
                        starRatedColor="yellow"
                    />
                </div>
                <p className={styles.description}>
                    {movie[0].description}
                </p>
                <p className={styles.description}>
                    {movie[0].director}
                </p>
            </div>
            <div className={styles.slider}>
                <Slider title="Comedy" firstSection={1} />
                <Slider title="Horror" firstSection={4} />
            </div>
            <div className={styles.comments}>
                {
                    movie[1].map(comment => (
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-header">
                                <StarRatings
                                    rating={comment.note / 2}
                                    starDimension="40px"
                                    starSpacing="15px"
                                    numberOfStars={5}
                                    starRatedColor="yellow"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{comment.title}</h5>
                                <p className="card-text">{comment.text}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie
