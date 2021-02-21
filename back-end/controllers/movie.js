const Movie = require("../models/Movie")

class Controller{
    async create(req, res){
        var {title, description, genre, note, thumb, year, movie_link, trailer_link} = req.body
        await Movie.new(title, description, genre, note, thumb, year, movie_link, trailer_link)

        res.send("Tudo OK!")
        res.status(200)
    }
}

module.exports = new Controller()