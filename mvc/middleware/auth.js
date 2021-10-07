// Middleware function for protecting routes that require authentication
module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) return res.redirect("/login");
  next();
};
