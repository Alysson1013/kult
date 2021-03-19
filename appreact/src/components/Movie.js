import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Movie = () => {
    const [movie, setMovie] = React.useState(null)
    const [error, setError] = React.useState(false)

    const {id} = useParams()
    console.log(id)

    React.useEffect(() => {
        axios.get(`http://localhost:8080/movie/${id}`)
            .then(response => setMovie(response.data))
            .catch(err => setError(true))
            console.log(movie)
    }, [id])

    if (movie == null) return null
    return (
        <div>
            
        </div>
    )
}

export default Movie
