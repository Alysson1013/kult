var express = require("express");
const { route } = require(".");
var router = express.Router();
var Controller = require('../controllers/user')
var auth = require('../middleware/auth')

router.post('/', Controller.create)
router.get('/admin/', auth, Controller.findAll)
router.get('/:id', Controller.findOne)
router.delete('/admin/', auth, Controller.delete)
router.delete('/deleteAccount', Controller.deleteAccount)
router.put("/updateAccount", Controller.updateAccount)
router.put('/admin/:id', auth, Controller.update)
router.post("/login", Controller.login)

module.exports = router
