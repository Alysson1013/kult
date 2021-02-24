var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/user')
var auth = require('../middleware/auth')

//User routes
router.get('/:id', Controller.findOne)
router.post('/', Controller.create)
router.delete('/deleteAccount', Controller.deleteAccount)
router.put("/updateAccount", Controller.updateAccount)
router.post("/login", Controller.login)

//ADM routes
router.get('/admin/', auth, Controller.findAll)
router.delete('/admin/', auth, Controller.delete)
router.put('/admin/:id', auth, Controller.update)


module.exports = router
