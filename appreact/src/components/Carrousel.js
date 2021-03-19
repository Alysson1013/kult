import React from 'react'
import styles from './Carrousel.module.css'
import photo1 from '../assets/werewolve.jpg'
import photo2 from '../assets/Caligari.jpg'
import photo3 from '../assets/classic.jpg'

const Carrousel = () => {
    return (
        <div id="carouselExampleCaptions" className={"carousel slide animate__animated animate__bounceInLeft " + styles.carrousel} data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={photo1} className={"d-block w-100 " } alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>The Wolf Man (1941)</h5>
                        <p>Discover the cult classics of cinema.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={photo2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>The Cabinet of Dr. Caligari (1920)</h5>
                        <p>Discover the most amazing works from the past.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={photo3} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Plan 9 from Outer Space</h5>
                        <p>And the not very incredible and classic.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carrousel
