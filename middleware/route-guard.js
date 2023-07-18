const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.session.currentUser.isAdmin === true) {
    return res.redirect("/view-all-plants");
  }
  next();
};

module.exports = {
  isLoggedIn,
  isAdmin,
};