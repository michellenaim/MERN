const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const BudgetCategoriesSchema = new Schema({
//     percent: {
//         type: Number,
//         default: .30
//     },
//     category: {
//         type: String,
//         default: "Home"
//     }
// })


const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // income: {
    //     type: Number,
    //     required: true// change to default: 0
    // },
    // budgetbreakdown: [BudgetCategoriesSchema],
    budgetBreakdown: [
        {
            percent: {
                type: Number,
                default: .30
            }, 
            category: {
                type: String,
                default: "Home"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Utilities"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Food"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Transportation"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Health & Fitness"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Shopping"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Entertainment"
            },
        },
        {
            percent: {
                type: Number,
                default: .10
            },
            category: {
                type: String,
                default: "Savings"
            },
        },
        {
            percent: {
                type: Number,
                default: .00
            },
            category: {
                type: String,
                default: "Other"
            },
        },
    ],
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema)


    // {
    //     _id: ObjectId("5d8d5b50a5b9d4a3c402f571"),
    //     firstname: "i_love_walking",
    //     lastname: "Smith",
    //     email: "walker@walkingisgreat.com",
    //     password_digest: "Ke&63h1z$mK9jd37n",
    //     income: 2800,
    //     budget_breakdown: [
    //        {percent: .30, category: "HOME"},
    //        {percent: .70, category: "DOG"}
    //    ],
    //     transactions: [
    //         {amount: 100,desc: "good",category: "HOME"}
    //     ]
    // }

    // budgetbreakdown: [
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" },
    //     { percent: .00, category: "" }
    // ]

// const childSchema = new Schema({ name: 'string' });

// const parentSchema = new Schema({
//     // Array of subdocuments
//     children: [childSchema],
//     // Single nested subdocuments. Caveat: single nested subdocs only work
//     // in mongoose >= 4.2.0
//     child: childSchema
// });