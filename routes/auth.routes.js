const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt.js');
const User = require ('../models/User.model');

/* GET sign_up page */
router.get("/sign_up", (req, res, next) => {
  res.render("auth/sign_in");
});


/* POST sign_up page */
router.post("/sign_up", async (req, res, next) => {
    console.log(req.body)
    res.render("index");
});



/* GET log_in page */
router.get("/log_in", (req, res, next) => {
    res.render("auth/log_in");
});

/* POST log_in page */
router.post("/log_in", (req, res, next) => {
    res.render("index");
});

module.exports = router;