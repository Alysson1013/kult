var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/user')

router.post('/', Controller.create)
router.get('/admin/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.delete('/admin/', Controller.delete)
router.put('/admin/:id', Controller.update)

module.exports = router
