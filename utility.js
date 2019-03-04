module.exports = {
  respondSuccess (res, data) {
    res.json({
      status: 'success',
      data
    })
  },

  respondFailure (res, errors, status = 500) {
    res.status(status).json({
      status: 'failure',
      errors
    })
  }
}