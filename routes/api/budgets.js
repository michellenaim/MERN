const express = require("express");
const router = express.Router();
const passport = require("passport");
// const validateBudgets = require("../..validation/budgets")
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "This is the budgets route" }));

// budgets index
router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {             
    
    res.status(200).json({
        income: req.user.income,
        budgetBreakdown: req.user.budgetBreakdown,
    });

});

//budget update item
router.patch("/update", passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.status(200).send({ message: "test message" });
  // validations for whether slider values add to 100%

  // let user = req.user;
  // let budgets = user.budgetbreakdown
  // User.poems.find_by(id: params[:id])
});

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