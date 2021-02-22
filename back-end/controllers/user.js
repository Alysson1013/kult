const User = require("../models/User")

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
            
            let emailexists = await User.findEmail(email)

            if(emailexists){
                res.status(406)
                return res.json({err: "Email já cadastrado."})
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

            delete changes.password
            delete changes.username
            delete changes.email
            delete changes.role

            try {
                let count = User.findByIdAndUpdate(id, changes)
                if (count) {
                  res.status(200).json({updated: count})
                } else {
                  res.status(404).json({message: "User not found"})
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