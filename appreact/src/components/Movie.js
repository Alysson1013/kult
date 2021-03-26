import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ReactPlayer from "react-player"
import styles from './Movie.module.css'
import Slider from './Slider'
import StarRatings from 'react-star-ratings';
import Head from './Head'
import { UserContext } from '../userStorage/userContext'
import axios from 'axios'

const Movie = () => {
    const [movie, setMovie] = React.useState(null)
    const [error, setError] = React.useState(false)
    const [commentBox, setCommentBox] = React.useState(null)
    const { id } = useParams()
    const { token } = React.useContext(UserContext)

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

    React.useEffect(() => {
        if (token != null) {
            function handleClick() {
                let title = document.getElementById("title").value
                let text = document.getElementById("text").value
                let note = document.querySelector('input[name="rate"]:checked').value;

                axios.post("http://localhost:8080/review", {
                    text: text,
                    title: title,
                    note: note,
                    movie_id: id
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(() => {
                    async function fetchMovie(url) {
                        try {
                            const response = await fetch(url)
                            const json = await response.json()
                            setMovie(json)
                        } catch (error) {
                            setError("Um erro ocorreu")
                        }
                    }
                    fetchMovie(`http://localhost:8080/movie/${id}`).then(response => {
                        console.log(response)
                        document.getElementById("title").value = ''
                        document.getElementById("text").value = ''
                        var inputs = document.querySelectorAll('input[type="radio"]');
                        for (var i = 0, l = inputs.length; i < l; i++) {
                            inputs[i].checked = false;
                        }
                    })
                })
            }

            setCommentBox(
                <div className={"card text-white bg-dark mb-3 " + styles.comments}>
                    <div className="card-header">
                        Adicione um crítica
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control bg-dark text-white" id="title" placeholder="" />
                            <br />
                            <label htmlFor="text" className="form-label">Text</label>
                            <textarea className={"form-control bg-dark text-white"} id="text" rows={3} defaultValue={""} />
                            <br />
                            <div className={styles.rate}>
                                <input type="radio" id="star5" name="rate" value={5} />
                                <label htmlFor="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" name="rate" value={4} />
                                <label htmlFor="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" name="rate" value={3} />
                                <label htmlFor="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" name="rate" value={2} />
                                <label htmlFor="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" name="rate" value={1} />
                                <label htmlFor="star1" title="text">1 star</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-transparent ">
                        <butto className="btn btn-secondary" onClick={handleClick}>
                            Postar
                        </butto>
                    </div>
                </div>
            )
        }
    }, [])

    console.log(token)
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
            {commentBox}
            <div className={styles.comments}>
                {
                    movie[1].map(comment => (
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-header">
                                <StarRatings
                                    rating={comment.note}
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
                            <div className="card-footer bg-transparent ">
                                <NavLink className={styles.user} to={`/profile/${comment.user_id}`}>
                                    {comment.username}
                                </NavLink>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie
