const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const User = require ('../models/User.model');

/* GET sign_up page */
router.get("/sign_up", (req, res, next) => {
  res.render("auth/sign_up");
});


/* POST sign_up page */
router.post("/sign_up", async (req, res, next) => {
    console.log(req.body)
    const {username, email} = req.body
    const salt = bcrypt.genSaltSync(13)

    const passwordHash = bcrypt.hashSync(req.body.password, salt)

    
    try {
        const newUser = await User.create({username, email, passwordHash})
        // Here we'll redirect our new user to their profile page
        res.redirect("/profile")
    } catch (error) {
        console.log(error)
    }

});



/* GET log_in page */
router.get("/log_in", (req, res, next) => {
    res.render("auth/log_in");
});

/* POST log_in page */
router.post("/log_in", async (req, res, next) => {
    console.log(req.body)

    try {
        const currentUser = req.body
        const confirmedUser = await User.findOne({email:req.body.email})

        if (confirmedUser) {

            if (bcrypt.compareSync(currentUser.password, confirmedUser.passwordHash)) {

               const loggedUser = {...confirmedUser._doc}
               delete loggedUser.passwordHash 
               console.log(loggedUser)
               res.redirect("/profile")

            } else {
                console.log("Wrong Password")
                res.render('auth/log_in', {errorMessage: "Wrong Credentials. Try Again"})
            }

        } else {
            console.log("E-mail not registered")
            res.render('auth/log_in', {errorMessage: "Wrong Credentials. Try Again"})
        }

        console.log(confirmedUser);

    } catch (error) {
        console.log(error)
        res.render("auth/log_in", { errorMessage: "There was an error on the server"})
    }

});

module.exports = router;