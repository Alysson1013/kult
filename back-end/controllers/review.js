require('dotenv').config()

const User = require("../models/User")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const bcrypt = require("bcrypt")
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

    async createReview(req, res){
        const authToken = req.headers['authorization']
        let {text, title, movie_id, note} = req.body

        if(authToken != undefined){
            const bearer = authToken.split(' ')
            const token = bearer[1]
    
            try{
                const decoded = jwt.verify(token, secret)
                console.log(decoded)

                try{
                    console.log("Caiu aqui dentro")
                    let user_id = decoded.id

                    await Review.new(text, title, user_id, movie_id, note)
            
                    res.send("OK")
                    res.status(200)
                }catch(err){
                    res.send(err)
                    res.status(500)
                }
            } catch(error){
                res.status(403)
                res.send("You are not Logged")
            }
        } else {
            res.status(403)
            res.send("You are not Logged")
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
            else res.status(404).end()
        } catch (error) {
            console.error(error)
            res.status(404).send(error)
        }
    }

    async deleteReview(req, res){
        const authToken = req.headers['authorization']
        let idToDelete = req.body.id

        if(authToken != undefined){
            const bearer = authToken.split(' ')
            const token = bearer[1]
    
            try{
                const decoded = jwt.verify(token, secret)
                console.log(decoded)
                try {
                    let idUser = decoded.id
                    let reviewUser = await Review.findById(idToDelete)

                    if (idUser == reviewUser[0].user_id){
                        let obj = await Review.findByIdAndDelete(idToDelete) 
                        
                        if (obj.status) res.status(204).end()
                        else res.status(404).end()
                    } else {
                        res.status(403)
                        res.send("You don't own this review")
                    }
                } catch (error) {
                    console.error(error)
                    res.status(404).send(error)
                }
            } catch(error){
                res.status(403)
                res.send("You are not Logged")
            }
        } else {
            res.status(403)
            res.send("You are not Logged")
        }
    }

    async update(req, res){
        try {
            let id = req.params.id
            let changes = req.body
            try {
                let obj = await Review.findByIdAndUpdate(id, changes)
                if (obj.status) res.status(201).end()
                else res.status(404).end()
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