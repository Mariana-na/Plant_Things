const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const { isLoggedIn, isAdmin } = require("../middleware/route-guard.js");
const uploader = require("../middleware/cloudinary.config.js");

/* GET sign_up page */
router.get("/sign_up", (req, res, next) => {
  res.render("auth/sign_up");
});

/* POST sign_up page */
router.post("/sign_up", uploader.single("imageUrl"), async (req, res, next) => {
  console.log(req.body);

  if (!req.file) {
    console.log("there was an error uploading the file");
    next(new Error("No file uploaded!"));
    return;
  }

  const { username, email } = req.body;
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  const userImage = req.file.path;

  try {
    const newUser = await User.create({
      username,
      email,
      userImage,
      passwordHash,
    });
    // Here we'll redirect our new user to their profile page
    // NEW COMMENT
    res.redirect("/log_in");
  } catch (error) {
    console.log(error);
  }
});

/* GET log_in page */
router.get("/log_in", (req, res, next) => {
  console.log("hello?");
  res.render("auth/log_in");
});

/* POST log_in page */
router.post("/log_in", async (req, res, next) => {
  console.log("SESSION =====> ", req.session);
  console.log(req.body);

  try {
    const currentUser = req.body; //assigning the values entered in the form to the variable currentUser
    const confirmedUser = await User.findOne({ email: req.body.email }); // checking to see if there is a user in the db with the same email address as the one that was entered

    if (confirmedUser) {
      // if a match is found then...
      if (
        // check if the password is correct
        bcrypt.compareSync(currentUser.password, confirmedUser.passwordHash)
      ) {
        const loggedUser = { ...confirmedUser._doc };
        delete loggedUser.passwordHash;
        console.log("This is the info for logged user: ", loggedUser);
        req.session.currentUser = loggedUser;
        console.log(
          "*** *** this is the req.session.currentUser: ",
          req.session.currentUser
        );

        res.redirect("/users/profile");
        //    res.render("profile", { userInSession: req.session.currentUser });
      } else {
        console.log("Wrong Password");
        res.render("auth/log_in", {
          errorMessage: "Wrong Credentials. Try Again",
        });
      }
    } else {
      console.log("E-mail not registered");
      res.render("auth/log_in", {
        errorMessage: "Wrong Credentials. Try Again",
      });
    }

    console.log(confirmedUser);
  } catch (error) {
    console.log(error);
    res.render("auth/log_in", {
      errorMessage: "There was an error on the server",
    });
  }
});

// GET profile page
router.get("/users/profile", (req, res) => {
  res.render("users/profile", { userInSession: req.session.currentUser });
});

//POST log_out

router.post("/log_out", (req, res, next) => {
  //this just deletes the session so the user is no longer recognised as logged in by the system
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/"); // sends the user back to the index page
  });
});

module.exports = router;
