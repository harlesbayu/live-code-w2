const router = require('express').Router()
const Controller = require('../controllers/eventController')
const isLogin = require('../middleware/isLogin')

router.get('/', Controller.findAll)
router.post('/', isLogin, Controller.create)
router.get('/search/:keyword', isLogin, Controller.searchByName)

module.exports = router