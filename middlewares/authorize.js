const { Room } = require('../models')

function authorization(req, res, next) {
  const userId = req.currentUser.id;
  const roomId = +req.params.id;
  console.log({ userId, roomId })
  Room.findByPk(roomId)
  .then(room => {

    console.log(room)
    if (!room) {
      throw { message: 'not authorized this access' }
    } else if (room.UserId !== userId) {
      throw { message: 'not authorized this access' }
    } else {
      next()
    }
  })
  .catch(err => {
    res.status(401).json(err)
  })
}

module.exports = authorization;
