const Review = require("../models/Review")

class Controller{
    async create(req, res){
        try{
            let {text, title, user_id, movie_id, note} = req.body
            await Review.new(text, title, user_id, movie_id, note)
    
            res.send("OK")
            res.status(200)
        }catch(err){
            res.send(err)
            res.status(500)
        }
    }

    async findAll(req, res){
        try {
            let data = await Review.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    
    async findOne(req, res){
        try {
            let id = req.params.id
            let data = await Review.findById(id)

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
            let obj = await Review.findByIdAndDelete(id) 
            console.log(obj)
            if (obj.status) res.status(204).end()
            else res.status(500).end()
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
                Review.findByIdAndUpdate(id, changes)
                res.status(201).end()
              } catch (err) {
                res.status(500).end()
              }
        } catch (error) {
            console.error(erro)
            res.status(500).end()
        }
    }
}

module.exports = new Controller()