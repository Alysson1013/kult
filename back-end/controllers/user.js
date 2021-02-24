require('dotenv').config()

const User = require("../models/User")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const bcrypt = require("bcrypt")


class Controller{
    async create(req, res){
        try{
            let {username, avatar, email, password, describe} = req.body

            if(email == undefined || !validator.isEmail(email)){
                res.status(400);
                return res.json({err: "Inválid Email"})  
            }
            if(password == undefined){
                res.status(400);
                return res.json({err: "Invalid Password"})    
            }

            if(username == undefined){
                res.status(400);
                return res.json({err: "Invalid Password"})    
            }
            
            let emailexists = await User.findEmail(email)
            let usernameexists = await User.findUsername(username)

            if(emailexists){
                res.status(406)
                return res.json({err: "Email already registered."})
            }
            if(usernameexists){
                res.status(406)
                return res.json({err: "Username already registered."})
            }

            await User.new(username, avatar, email, password, describe)
            res.send("OK")
            res.status(200)
        }catch(err){
            res.send(err)
            res.status(500)
        }
    }

    async findAll(req, res){
        try {
            let data = await User.findAll()
            res.send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    
    async findOne(req, res){
        try {
            let id = req.params.id
            let data = await User.findById(id)
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
            let obj = await User.findByIdAndDelete(id) 
            console.log(obj)
            if (obj.status) res.status(204).end()
            else res.status(404).end()
        } catch (error) {
            console.error(error)
            res.status(404).send(error)
        }
    }

    async updateAccount(req, res){
        const authToken = req.headers['authorization']
        let changes = req.body

        if(authToken != undefined){
            const bearer = authToken.split(' ')
            const token = bearer[1]
    
            try{
                const decoded = jwt.verify(token, secret)
                console.log(decoded)
                try {
                    let id = decoded.id

                    delete changes.password
                    delete changes.username
                    delete changes.email
                    delete changes.role

                    console.log(id)

                    await User.findByIdAndUpdate(id, changes)
                    res.status(201).end()
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

    async deleteAccount(req, res){
        const authToken = req.headers['authorization']

        if(authToken != undefined){
            const bearer = authToken.split(' ')
            const token = bearer[1]
    
            try{
                const decoded = jwt.verify(token, secret)
                console.log(decoded)
                try {
                    let id = decoded.id
                    let obj = await User.findByIdAndDelete(id) 
                    console.log(obj)
                    if (obj.status) res.status(204).end()
                    else res.status(404).end()
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

            User.findByIdAndUpdate(id, changes)
            res.status(201).end()
        } catch (error) {
            console.error(erro)
            res.status(500).end()
        }
    }

    async login(req, res){
        let {email, password} = req.body

        let user = await User.findByEmail(email)

        if (user != undefined){
            let result = await bcrypt.compare(password, user.password)
            if (result){
                let token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    role: user.role
                }, secret)
                res.status(200)
                res.send({
                    token: token
                })
            } else {
                res.status(406)
                res.send("Incorrect Password")
            }
        } else {
            res.json({
                status: false
            })
        }
    }
}

module.exports = new Controller()