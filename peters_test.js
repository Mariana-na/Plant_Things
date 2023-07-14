/* POST log_in page */
router.post("/log_in", (req, res, next) => {
  console.log("SESSION =====> ", req.session);

  // req.body destructuring
  // and email and password validation stay the same

  User.findOne({ email }) // searching for a user in the db using email as they key
    .then((user) => {
      // when the result of this has been returned...
      if (!user) {
        // if there is no result found in the db...
        res.render("auth/log_in", {
          //take the user to the log_in page and...
          errorMessage: "Email is not registered. Try with other email.", // ...display an error message
        });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        // if there is a user and the hashed password they give matches the stored password hash then...
        req.session.currentUser = user; //... the info from the form is assigned to the variable "user"
        res.redirect("/profile"); // take the user to the profile page
      } else {
        res.render("auth/log_in", { errorMessage: "Incorrect password." }); //if the password doesn't match, show error message (change this?)
      }
    })
    .catch((error) => next(error));
});

end;
