const router = require('express').Router()
const RoomController = require('../controllers/RoomController')
const authorize = require('../middlewares/authorize')

router.get('/', RoomController.showAll)

router.post('/', RoomController.createRoom)

router.delete('/:id', authorize, RoomController.deleteRoom)

router.post('/:id', RoomController.joinRoom)

router.get('/:id', RoomController.getRoomUser)


module.exports = router