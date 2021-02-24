var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/user')
var auth = require('../middleware/auth')

//ADM routes
router.post('/admin/', auth, Controller.create)
router.get('/admin/', auth, Controller.findAll)
router.delete('/admin/', auth, Controller.delete)
router.put('/admin/:id', auth, Controller.update)


module.exports = router
