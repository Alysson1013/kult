import React from 'react'
import styles from './Home.module.css'
import Slider from './Slider'
import Carrousel from "./Carrousel";

const Home = () => {
    return (
        <div>
            <div className={styles.carrousel}>   
                <Carrousel />
            </div>
            
            <Slider title="Comedy" firstSection={1} />
            <Slider title="Horror" firstSection={4} />
            
        </div>
    )
}

export default Home
