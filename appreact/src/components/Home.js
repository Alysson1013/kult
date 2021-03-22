import React from 'react'
import styles from './Home.module.css'
import Slider from './Slider'
import Carrousel from "./Carrousel";
import Head from "./Head"

const Home = () => {
    return (
        <div>
            <Head title="Kult | Home" />
            <div className={styles.carrousel}>   
                <Carrousel />
            </div>
            
            <Slider title="Comedy" firstSection={1} />
            <Slider title="Horror" firstSection={4} />
            <Slider title="B-Movie" firstSection={7} />
            
        </div>
    )
}

export default Home
