const { Room, User, UserRoom } = require('../models/index')

class RoomController {
  static showAll(req, res, next){
    const option = {
      include: [User]
    }

    Room.findAll(option)
      .then(room => {
        res.status(200).json(room)
      })
      .catch(err => {
        next(err)
      })
  }
  
  static createRoom(req, res, next){
    const { name } = req.body
    const maxPlayer = 2
    const UserId = req.currentUser.id

    Room.create({ name, maxPlayer, UserId })
      .then(room => {
        res.status(201).json(room)
      })
      .catch(err => {
        next(err)
      })
  }

  static joinRoom(req, res, next){
    const option = {
      where: {
        id: +req.params.id
      }
    }
    
    Room.findOne(option)
      .then(room => {

        return UserRoom.create({ UserId: room.UserId, RoomId: room.id })
      })
      .then(UserRoom => {
        res.status(200).json(UserRoom)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteRoom(req, res, next){
    const option = {
      where: {
        id: +req.params.id
      }
    }

    Room.destroy(option)
      .then(room => {
        res.status(200).json({ msg: "Delete Success" })
      })
      .catch(err => {
        next(err)
      })
  }
}


module.exports = RoomController