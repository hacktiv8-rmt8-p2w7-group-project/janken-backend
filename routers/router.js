const router = require('express').Router()
const roomRouter = require('./room')
const UserController = require('../controllers/UserController')

router.post('/login', UserController.login)

router.use('/rooms', roomRouter)


module.exports = router