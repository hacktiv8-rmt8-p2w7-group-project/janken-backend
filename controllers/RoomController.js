const { Room, User } = require('../models/index')

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

    Room.create({ name, maxPlayer })
      .then(room => {
        const newUserRoom = {
          UserId: req.currentUser.id,
          RoomId: room.id
        }

        return UserRoom.create(newUserRoom)
      })
      .then(userroom => {
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
      },
      include: [User]
    }
    
    Room.findOne(option)
      .then(room => {
        res.status(200).json(room)
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