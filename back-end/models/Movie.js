const { default: slugify } = require("slugify")
const knex = require("../config/database")

class Movie {
    async new(title, description, genre, note, thumb,  year, movie_link, trailer_link, duration, director){
        try {
            await knex.insert({
                title, description, genre, note, thumb, year, movie_link, trailer_link, duration, director
            }).table("movies")
        } catch (error) {
            console.log(error)
        }
        
    }
    async findAll(){
        try {
            let result = await knex.select(['*']).table("movies")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id){
        try {
            let result = await knex.select(['*']).where({id: id}).table("movies")
            result.push(await knex.select(["users.avatar", "users.username", "reviews.text", "reviews.title", "reviews.note"]).table("users").innerJoin("reviews", "reviews.user_id", "users.id").innerJoin("movies", "movies.id", "reviews.movie_id").where("reviews.movie_id", id))
            return result 
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findByIdAndDelete(id){
        try {
            let data = await this.findById(id)
            console.log(data)
            if(data.length == 2){
                try {
                    await knex.delete().where({id: id}).table("movies")
                    return { status: true }
                } catch (error) {
                    return{
                        status: false,
                        error: error
                    }
                }
            } 
        } catch (error) {
            return{
                status: false,
                error: error
            }
        }
    }

    async findByIdAndUpdate(id, changes){ 
        try {
            let count = await knex.where({id: id}).update(changes).table('movies')
            if (count){
                return{
                    status: true
                }
            } else {
                return{
                    status: false,
                    error: "Not Found"
                }
            }
        } catch (error) {
            return{
                status: false,
                error: error
            }
        }

    }
}

module.exports = new Movie()