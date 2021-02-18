const router = require('express').Router()
const RoomController = require('../controllers/RoomController')

router.get('/', RoomController.showAll)

router.post('/', RoomController.createRoom)

router.delete('/', RoomController.deleteRoom)

router.get('/:id', RoomController.deleteRoom)


module.exports = router