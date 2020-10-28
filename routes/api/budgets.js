const express = require("express");
const router = express.Router();
const passport = require("passport");
// const validateBudgets = require("../..validation/budgets")
const User = require("../../models/User");
const db = require("../../config/keys").mongoURI;

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
  //   res.status(200).json({
  //       user: req.user
  //   });

  let userId = req.user._id;
  //   let user = User.findOne(userId)
  // console.log(req.user)
  // console.log(req.user.budgetBreakdown)

  // //   console.log(res.json(req.user.budgetBreakdown[0]))
  //   req.user.budgetBreakdown.forEach( (obj) => {
  //       req.body.budgetBreakdown.forEach((reqObj) => {
  //         if (obj._id === reqObj._id) {
  //             obj.percent = reqObj.percent
  //         }
  //       })
  //   })

  // for(let i = 0; i < 9; i++) {
  //     for(let j = 0; j < req.body.budgetBreakdown.length; j++) {
  //         if (req.user.budgetBreakdown[i].category === req.body.budgetBreakdown[j].category) {
  //                 req.user.budgetBreakdown[i].percent = req.body.budgetBreakdown[j].percent;
  //         }
  //     }
  // }

//   res.status(200).json({
//     userBudget: req.user.budgetBreakdown,
//     updatedBudget: req.body.budgetBreakdown,
//   });

//   db.
  User
    .updateOne(
    // .findOneAndUpdate(
      {
        budgetBreakdown: [
          {
            percent: 0.3,
            category: "Home",
          },
          {
            percent: 0.1,
            category: "Utilities",
          },
          {
            percent: 0.1,
            category: "Food",
          },
          {
            percent: 0.1,
            category: "Transportation",
          },
          {
            percent: 0.1,
            category: "Health & Fitness",
          },
          {
            percent: 0.1,
            category: "Shopping",
          },
          {
            percent: 0.1,
            category: "Entertainment",
          },
          {
            percent: 0.1,
            category: "Savings",
          },
          {
            percent: 0,
            category: "Other",
          },
        ],
      },
      {
        $set: {
          budgetBreakdown: res.json(req.body.budgetBreakdown),
        //   budgetBreakdown: req.body.budgetBreakdown,
        },
      },
    //   options
    )
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(error));

  // console.log(res.json(req.user.budgetBreakdown));

  //   const { income, budgetBreakdown } = req.body; // or req.body
  //   const updated = {
  //     income,
  //     ...budgetBreakdown,
  //   };
  //     req.user.budgetBreakdown

  //   budgetBreakdown.forEach((obj, idx) => {
  //         let id = obj._id
  //         let id = budgetBreakdown._id
  //         console.log(id)
  //         // if (obj._id === id) {
  //         //     obj.percent = req.body.budgetBreakdown.percent || obj.percent;
  //         }
  //   })

  //   res.send({
  //     user: updated,
  //   });

  // let budgets = user.budgetbreakdown
});

// router.route("/update/:id").post((req, res) => {

//   Exercise.findById(req.params.id)
//     .then((exercise) => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise
//         .save()
//         .then(() => res.json("Exercise updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

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