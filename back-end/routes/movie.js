var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/movie')

router.post('/', Controller.create)

module.exports = router
