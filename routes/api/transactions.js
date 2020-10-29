const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");

// use asynchronous routes

// transactions index
router.get("/", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {

    res.status(200).json({
      transactions: req.user.transactions
    });
});

router.post("/", passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
        // const { isValid, errors } = validateTransactions(req.body);

        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }

        const { date, amount, description, category } = req.body.transaction;

        console.log(req.body)


        await req.user
          .set({
            transactions: [
              {
                date,
                amount,
                description,
                category,
              },
              ...req.user.transactions,
            ],
          })
          .save();

        console.log(req.user);

        res.status(200).json({
            transactions: req.user.transactions
        });
});

// transactions update 
router.patch("/update", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
    
    
});


// delete one transaction
router.delete("/delete", passport.authenticate('jwt', { session: false }), 
    async (req, res) => {

    // how data should come in from frontend. lines 71-74 optional
    // {
    //     "transaction": 
    //         {
    //             "_id": "5f9b15d556a2a02df13585c0",
    //             "date": "2020-10-30T00:00:00.000Z",
    //             "amount": 750,
    //             "description": "rent",
    //             "category": "Home"
    //         }
    // }
    
    // select only the transactions that have object ids !== object id from body 
    // need to ensure types are same 
    const updatedTransactions = req.user.transactions.filter((t) => {
        return t._id.toString() !== req.body.transaction._id
    });
    
    // console.log(updatedTransactions.length);

    req.user.set({
      transactions: updatedTransactions,
    });

    await req.user.save();      // update user sans transaction in DB

    // return remaining transactions, or omit if needed 
    res.json({
        transactions: req.user.transactions
    });
});


module.exports = router;


// POSTMAN TESTING:

// to create transaction 
// {
//     "transaction": {
//         "date": "2020-10-30",
//         "amount": 10,
//         "description": "book",
//         "category": "Shopping"
//     }
// }

// to delete a transaction, select specific _id
// {
//     "transaction": 
//         {
//             "_id": "5f9b3339e66bd953e6adf3f6",
//             "date": "2020-10-30T00:00:00.000Z",
//             "amount": 750,
//             "description": "rent",
//             "category": "Home"
//         }
// }
