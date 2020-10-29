const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
// const db = require("../../config/keys").mongoURI;

// use asynchronous routes

router.get("/test", (req, res) => res.json({ msg: "This is the transactions route" }));

// transactions index
router.get("/", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {

    res.status(200).json({
      transactions: req.user.transactions
    });
});

router.post("/", passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
        const { amount, description, category} = req.body.transaction;

        // req.body.save()
        console.log(req.body)
        // console.log(res.json(res.body)) 


        //  res.json({
        //    transactions: req.user.transactions,
        //  });
        
        // const { isValid, errors } = validateTweetInput(req.body);

        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }

        // req.user.set({
        //     toDelete: undefined
        // });

        await req.user.set({
          transactions: [
            ...req.user.transactions,
            {
              amount,
              description,
              category,
            },
          ],
        }).save();

        console.log(req.user);

        // res.status(200).jsonp({});

        // const newUser = new User({
        //     user: req.user.id,
        //     transaction: req.body.transaction
        // });

        // newUser
        //     .save()
        //     .then(transaction => res.status(200).json(transaction));
});

//transactions update 
router.patch("/update", passport.authenticate('jwt', { session: false }), async (req, res) => {
    
    
});


module.exports = router;

// {
//     "transaction": {
//         "amount": 20,
//         "description": "dinner",
//         "category": "Food"
//     }
// }

// {
//     "income": 1000,
//     "budgetBreakdown": [
//         {
//             "percent": 0.2,
//             "category": "Home"
//         },
//         {
//             "percent": 0.2,
//             "category": "Entertainment"
//         },
//         {
//             "percent": 0,
//             "category": "Other"
//         }
//     ]
// }