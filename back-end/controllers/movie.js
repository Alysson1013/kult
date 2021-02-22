const Movie = require("../models/Movie")

class Controller{
    async create(req, res){
        try{
            var {title, description, genre, note, thumb, year, movie_link, trailer_link} = req.body
            await Movie.new(title, description, genre, note, thumb, year, movie_link, trailer_link)
    
            res.send("Tudo OK!")
            res.status(200)
        }catch(err){
            res.send(err)
            res.status(500)
        }
    }

    async index(req, res){
        try {
            let data = await Movie.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}

module.exports = new Controller()