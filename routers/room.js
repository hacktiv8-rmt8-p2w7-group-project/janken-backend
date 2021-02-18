const router = require('express').Router()
const RoomController = require('../controllers/RoomController')
const authorize = require('../middlewares/authorize')

router.get('/', RoomController.showAll)

router.post('/', RoomController.createRoom)

router.delete('/:id', authorize, RoomController.deleteRoom)

router.get('/:id', RoomController.joinRoom)


module.exports = router