function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({
        message: 'email already exists'
      })
      break;
    case 'SequelizeValidationError':
      err.errors.map(errs => {
        errs.message
        res.status(400).json({
          message: errs.message
        })
      })
      break;

    default:
      res.status(500).json({
        message: 'internal server error'
      })
      break;
  }
}

module.exports = errorHandler;
