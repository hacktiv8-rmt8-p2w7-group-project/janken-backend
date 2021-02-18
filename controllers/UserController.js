const { User } = require('../models/index')
const generateToken = require('../helpers/genToken')

class UserController {
  static login(req, res, next){
    const { name } = req.body
    const score = 0
    const option = {
      where: {
        name
      }
    }

    User.findOne(option)
      .then(user => {
        if (user){
          return user
        } else{
          return User.create({ name, score })
        }
      })
      .then(user => {
        const {id, name} = user
        const access_token = generateToken({ id, name })

        res.status(200).json({ access_token, id, name })
      })
      .catch(err => {
        next(err)
      })
  }
}


module.exports = UserController