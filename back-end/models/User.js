const knex = require("../config/database")
const bcrypt = require("bcrypt")


class Movie {
    async new(username, avatar, email, password, describe){
        try {
            let hash = await bcrypt.hash(password, 10)
            await knex.insert({ 
                username, email, avatar, describe, password: hash, role: 0
            }).table("users")
        } catch (error) {
            console.log(error)
        }
        
    }
    async findAll(){
        try {
            let result = await knex.select(['*']).table("users")
            return result
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async findById(id){
        try {
            let result = await knex.select(['*']).where({id: id}).table("users")
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
                    await knex.delete().where({id: id}).table("users")
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
        if(changes['password']) changes.password = await bcrypt.hash(changes['password'], 10)
        try {
            let count = await knex.where({id: id}).update(changes).table('users')
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

    async findEmail(email){
        try {
            let result = await knex.select("*").from("users").where({email: email})

            if(result.length > 0) return true
            else return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async findUsername(username){
        try {
            let result = await knex.select("*").from("users").where({username: username})
            console.log(result)

            if(result.length > 0) return true
            else return false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async findByEmail(email){
        try {
            var result = await knex.select(['*']).where({email: email}).table("users")
            if (result.length > 0){
                return result[0]
            } else {
                return undefined
            }
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

}

module.exports = new Movie()