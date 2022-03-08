module.exports.checkLogIn = (req, res, next) => {
  if (req.session.user) {
    next();
  }
}

