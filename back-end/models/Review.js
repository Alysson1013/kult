const { default: slugify } = require("slugify")
const knex = require("../config/database")

class Review {
    async new(text, title, user_id, movie_id, note){
        try {
            await knex.insert({
                text, title, user_id, movie_id, note
            }).table("reviews")
        } catch (error) {
            console.log(error)
        }
        
    }
    async findAll(){
        try {
            let result = await knex.select(["users.id as user_id", "users.username", "reviews.id", "reviews.title", "reviews.note", "movies.id as movie_id"]).table("users").innerJoin("reviews", "reviews.user_id", "users.id").innerJoin("movies", "movies.id", "reviews.movie_id")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id){
        try {
            let result = await knex.select(["users.id as user_id", "users.username", "reviews.id", "reviews.title", "reviews.note", "movies.id as movie_id"]).table("users").innerJoin("reviews", "reviews.user_id", "users.id").innerJoin("movies", "movies.id", "reviews.movie_id").where("reviews.id", id)
            return result 
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findByIdAndDelete(id){
        try {
            let data = await this.findById(id)
            if(data.length == 1){
                try {
                    await knex.delete().where({id: id}).table("reviews")
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
        let count = await knex.where({id: id}).update(changes).table('reviews')
        return count
    }
}

module.exports = new Review()