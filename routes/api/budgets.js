const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// use asynchronous routes

// budgets index
router.get("/", passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
  
    // calculate income splits from user's income
    let userIncome = req.user.income;

    req.user.budgetBreakdown.forEach((obj) => {
    obj.incomeSplit = userIncome * obj.percent;
    });

    res.status(200).json({
      income: req.user.income,
      budgetBreakdown: req.user.budgetBreakdown,
    });
});

//budgets update 
router.patch("/update", passport.authenticate('jwt', { session: false }), 
  async (req, res) => {
    try {
      // update user income in DB with user's input from frontend
      req.user.income = req.body.income;

      // update user budget breakdown percentages in DB with user's input
      req.body.budgetBreakdown.forEach((bodyObj) => {
        let updatedBudgetCategory = req.user.budgetBreakdown.filter(
          (originalObj) => bodyObj.category === originalObj.category
        )[0];

        updatedBudgetCategory.percent = bodyObj.percent;
      });

      // calculate income splits from user's income
      let userIncome = req.user.income;

      req.user.budgetBreakdown.forEach((obj) => {
        obj.incomeSplit = userIncome * obj.percent;
      });

      // return the information from backend
      res.status(200).json({
        income: req.user.income,
        budgetBreakdown: req.user.budgetBreakdown,
      });
    } catch (error) {
      console.error(error);
    }
    
  // for debugging, to see updated user in server
  // const updatedUser = await req.user.save();   // await => wait until the user saves
  // console.log(updatedUser);
});

module.exports = router;


// TODO: SEND FRONTEND DATA LIKE THIS. APPLICATION/JSON content-type (in handleSubmit)
// axios.post('/url', { name: 'asdasd', age: 15});

// {
//     "income": 0,
//     "budgetBreakdown": [
//         {
//             "percent": 0.53,
//             "category": "Home"
//         },
//         {
//             "percent": 0.6,
//             "category": "Other"
//         }
//     ]
// }


// for debugging 
//   res.status(200).json({
//       user: req.user
//   });

//   res.status(200).json({
//     userBudget: req.user.budgetBreakdown,
//     updatedBudget: req.body.budgetBreakdown,
//   });

//   const updatedUser = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     {
//       $set: {
//         budgetBreakdown: req.body.budgetBreakdown,   
        // set updates the object but re-assigns a new object ID each time
//       },
//     }
//     //   options
//   );
