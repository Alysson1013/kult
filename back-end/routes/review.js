var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/review')
const auth = require('../middleware/auth')

//ADM routes
router.post('/admin/', auth, Controller.create)
router.get('/admin/', Controller.findAll)
router.get('/admin/:id', Controller.findOne)
router.delete('/admin/', auth, Controller.delete)
router.put('/admin/:id', auth, Controller.update)

//User routes
router.post('/', Controller.createReview)
router.delete('/', )


module.exports = router
