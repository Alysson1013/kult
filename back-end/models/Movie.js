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
    async findAll(){
        try {
            const result = await knex.select(['*']).table("movies")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }
}

module.exports = new Movie()