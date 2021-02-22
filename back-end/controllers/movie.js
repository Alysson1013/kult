const Movie = require("../models/Movie")

class Controller{
    async create(req, res){
        try{
            let {title, description, genre, note, thumb, year, movie_link, trailer_link, duration} = req.body
            await Movie.new(title, description, genre, note, thumb, year, movie_link, trailer_link, duration)
    
            res.send("OK")
            res.status(200)
        }catch(err){
            res.send(err)
            res.status(500)
        }
    }

    async findAll(req, res){
        try {
            let data = await Movie.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    
    async findOne(req, res){
        try {
            let id = req.params.id
            let data = await Movie.findById(id)
            if (data.length == 1) res.send(data)
            else res.status(404).end()
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    } 

    async delete(req, res){
        try {
            let id = req.body.id
            let obj = await Movie.findByIdAndDelete(id) 
            console.log(obj)
            if (obj.status) res.status(204).end()
            else res.json(obj)
        } catch (error) {
            console.error(error)
            res.status(404).send(error)
        }
    }
    
    async update(req, res){
        try {
            let id = req.params.id
            let changes = req.body
            try {
                let count = Movie.findByIdAndUpdate(id, changes)
                if (count) {
                  res.status(200).json({updated: count})
                } else {
                  res.status(404).json({message: "Movie not found"})
                }
              } catch (err) {
                res.status(500).json({message: "Error updating", error: err})
              }
        } catch (error) {
            console.error(erro)
            res.status(500).end()
        }
    }
}

module.exports = new Controller()