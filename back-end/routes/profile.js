var express = require("express");
var router = express.Router();
var Controller = require('../controllers/user')

router.get('/:id', Controller.findOne)
router.delete('/', Controller.deleteAccount)
router.put("/", Controller.updateAccount)
router.post("/login", Controller.login)
router.post("/", Controller.create)

module.exports = router