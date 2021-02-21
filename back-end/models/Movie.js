const { default: slugify } = require("slugify")
const knex = require("../config/database")

class Movie {
    async new(title, description, genre, note, thumb,  year, movie_link, trailer_link){
        try {
            await knex.insert({
                title, description, genre, note, thumb, year, movie_link, trailer_link, slug: slugify(title)
            }).table("movies")
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = new Movie()