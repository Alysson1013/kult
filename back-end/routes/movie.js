var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/movie')
const auth = require('../middleware/auth')

//ADM routes
router.post('/admin', auth, Controller.create)
router.delete('/admin/', auth, Controller.delete)
router.put('/admin/:id', auth, Controller.update)

//USER routes
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)

module.exports = router
