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
            let result = await knex.select(['*']).table("reviews")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id){
        try {
            let result = await knex.select(['*']).where({id: id}).table("reviews")
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