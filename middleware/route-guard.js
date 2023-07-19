const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/log_in");
  }
  next();
};

const isAdmin = (req, res, next) => {
  console.log(
    "LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME –––––– REQ.SESSION ",
    req.session
  );
  if (req.session.currentUser.isAdmin === true) {
    console.log(
      "LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME LOOK AT ME  route guard"
    );
     next();

  } else {
    console.log("You're not an admin", req.session);
  }
  
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
