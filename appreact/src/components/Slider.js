import React from 'react'
import axios from 'axios'
import styles from './Slider.module.css'


const Slider = ({title, firstSection}) => {
    const [movies, setMovies] = React.useState(null)

    React.useEffect(() => {
        axios.get(`http://localhost:8080/movie/genre/${title.toLowerCase()}`)
            .then(response => setMovies(response.data))
            .catch(err => console.log(err))
    }, [])

    const section1 = []
    const section2 = []
    const section3 = []

    if (movies == null){
        return null
    } else {
        for (let i=0; i<3; i++){
            console.log(i)
            if (movies[i] === undefined){
                break;
            } else {
                section1.push(
                    <div className="item" key={movies[i].id}>
                        <img src={movies[i].thumb} alt="Movie" />
                    </div>
                )
            }
        }
        for (let i = 3; i < 7; i++){
            console.log(i)
            if (movies[i] === undefined){
                break;
            } else {
                section2.push(
                    <div className="item" key={movies[i].id}>
                        <img src={movies[i].thumb} alt="Movie" />
                    </div>
                )
            }
        }
        for (let i = 7; i < 10; i++){
            console.log(i)
            if (movies[i] === undefined){
                break;
            } else {
                section3.push(
                    <div className="item" key={movies[i].id}>
                        <img src={movies[i].thumb} alt="Movie" />
                    </div>
                )
            }
        }
    }
    return (
        <div className={styles.slider}>
          {title}
          <div className="wrapper animate__animated animate__bounce animate__bounceInLeft">
            <section id={"section" + firstSection}>
                <a href={"#section" + (firstSection + 2)} className="arrow__btn">‹</a>
                    {section1}
                <a href={"#section" + (firstSection + 1)}  className="arrow__btn">›</a>
            </section>

            <section id={"section" + (firstSection + 1)}>
              <a href={"#section" + firstSection} className="arrow__btn">‹</a>
               {section2}
              <a href={"#section" + (firstSection + 2)} className="arrow__btn">›</a>
            </section>
            
            <section id={"section" + (firstSection + 2)}>
              <a href={"#section" + (firstSection + 1)} className="arrow__btn">‹</a>
               {section3}
              <a href={"#section" + (firstSection)} className="arrow__btn">›</a>
            </section>

          </div>
        </div>
    )    
}

export default Slider
