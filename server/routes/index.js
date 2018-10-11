const router = require('express').Router()
const routerUser = require('./users')
const routerEvent = require('./events')

router.use('/users', routerUser)
router.use('/events', routerEvent)

module.exports = router