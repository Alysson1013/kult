var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/user')

router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.delete('/', Controller.delete)
router.put('/:id', Controller.update)

module.exports = router
