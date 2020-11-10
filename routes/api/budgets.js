const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const {check, validationResult} = require('express-validator');

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
router.patch("/update", 
[
  check('income').not().isEmpty().withMessage("Income cannot be empty"),
  check('income').isNumeric().withMessage("Income should be a number"),
],
passport.authenticate('jwt', { session: false }), 
  async (req, res) => {

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }
        
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
      await req.user.save();
      // return the information from backend
      res.status(200).json({
        income: req.user.income,
        budgetBreakdown: req.user.budgetBreakdown,
      });
    } catch (errors) {
      return res.status(422).json({ 
        ...errors
      });
    }
});

module.exports = router;