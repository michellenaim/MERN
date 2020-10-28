const express = require("express");
const router = express.Router();
const passport = require("passport");
// const validateBudgets = require("../..validation/budgets")
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "This is the budgets route" }));

// budgets index
router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => { 

    // user already present in session, no need to find 
    // const user = await User.findOne({ id: req.user.id });


    res.json({
        budgetBreakdown: req.user.budgetBreakdown
    });
    
    // res.status(200).jsonp({
    //     budgetBreakdown: req.user.budgetBreakdown
    //     returns {"budgetBreakdown":[]} 
    // });
    

});

//budget index item
// router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => { 
// }

// quotesCollection.findOneAndUpdate(
//     query, // allows filtering w key-value pairs; ex: set this line to { category: "Home "}
//     update,
//     options
// )
//     .then(result => {/* ... */ })
//     .catch(error => console.error(error))

// quotesCollection.findOneAndUpdate(
//     { name: 'Yoda' },
//     {
//         $set: {
//             name: req.body.name,
//             quote: req.body.quote
//         }
//     },
//     options
// )
//     .then(result => {/* ... */ })
//     .catch(error => console.error(error))

//budget update item
// router.patch("/update", passport.authenticate('jwt', { session: false }), (req, res) => { 
//     // validations for whether slider values add to 100%

//     // find user 
//     User.findOne({ id: req.user.id  })
//       .catch
//       .then(user => {
//         if (!user) {
//           return res.status(404).json(errors);
//         }

    // let user = req.user;
    // let budgets = user.budgetbreakdown

    // User.poems.find_by(id: params[:id])

    // Tweet.find({ user: req.params.user_id })
    //     .then(tweets => res.json(tweets))
    //     .catch(err =>
    //         res.status(404).json({ notweetsfound: 'No tweets found from that user' }
    //         )

// });


// another example to showcase our budget percentages and categories? 
// app.get('/', (req, res) => {
//     db.collection('quotes').find().toArray()
//         .then(results => {
//             console.log(results)
//         })
//         .catch(error => console.error(error))
//     // ...
// })


module.exports = router;