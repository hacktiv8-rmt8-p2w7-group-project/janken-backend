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
    // const { name } = req.body
    console.log('masuuk');
    const maxPlayer = 2
    const UserId = req.currentUser.id
    Room.findAll()
      .then(rooms => {
        console.log({rooms});
        return Room.create({ name: `Game Room ${rooms.length + 1}`, maxPlayer, UserId })
      })
      .then(room => {
        console.log({room});
        res.status(201).json(room)
      })
      .catch(err => {
        next(err)
      })
  }

  static joinRoom(req, res, next){
    const UserId = req.currentUser.id
    const RoomId = +req.params.id
    const option = {
      where: {
        RoomId
      }
    }
    
    UserRoom.findAll(option)
      .then(room => {
        if (room.length < 2) {
          return UserRoom.create({ UserId, RoomId })
        } else {
          throw { message: 'sorry room full' }
        }
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

  static getRoomUser(req, res, next) {
    console.log('masuuuk');
    const RoomId = +req.params.id
    console.log({RoomId});
    const option = {
      where: {
        RoomId
      }
    }

    UserRoom.findAll(option)
      .then(rooms => {
        console.log({rooms});
        res.status(200).json(rooms)
      })
      .catch(err => {
        console.log({err});
        next(err)
      })
  }
}


module.exports = RoomController