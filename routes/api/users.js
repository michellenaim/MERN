const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email
    });
})

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "A user is already registered with that email" 
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
      });

      // 1st arg is number of rounds we're doing to generate salt
      // 2nd arg is callback function that gets invoked when salt is created
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; // hash is the hashed password
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err)); // catch and print error if fails
        });
      });
    }
  });
});


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          errors.email = 'There is no account with this email'
          return res.status(404).json(errors);
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, email: user.email};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                errors.password = "Incorrect password"
                return res.status(400).json(errors);
            }
        })
    })
})



// router.patch("/", passport.authenticate('jwt', { session: false }), (req, res) => { 
//     // validations for whether slider values add to 100%

//     // find user 
//     User.findOne({ id: req.user.id  })
//       .catch
//       .then(user => {
//         if (!user) {
//           return res.status(404).json(errors);
//         }

// });


module.exports = router;
