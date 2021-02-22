var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/review')
const auth = require('../middleware/auth')

router.post('/', auth, Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.delete('/', auth, Controller.delete)
router.put('/:id', auth, Controller.update)

module.exports = router
