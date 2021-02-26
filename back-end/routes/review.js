var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/review')
const auth = require('../middleware/auth')

//ADM routes
router.delete('/admin/', auth, Controller.delete)
router.put('/admin/:id', auth, Controller.update)

//User routes
router.post('/', Controller.createReview)
router.delete('/', Controller.deleteReview)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)

module.exports = router
