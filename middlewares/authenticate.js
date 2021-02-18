const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    const token = req.headers.access_token;
    const currentUser = jwt.verify(token, process.env.SECRET)
    req.currentUser = currentUser;
    next()
  } catch {
    res.status(401).json({
      message: 'invalid key'
    })
  }
}

module.exports = authentication;
