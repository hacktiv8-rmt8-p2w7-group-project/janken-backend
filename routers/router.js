const router = require('express').Router()
const roomRouter = require('./room')
const UserController = require('../controllers/UserController')
const authenticate = require('../middlewares/authenticate')

router.post('/', UserController.login)

router.use('/rooms',authenticate, roomRouter)


module.exports = router