const { Room } = require('../models/index')

class RoomController {
  static showAll(req, res, next){

  }
  
  static createRoom(req, res, next){

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