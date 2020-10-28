const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultBudgetCategories = [
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
];


const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      default: 0,
    },
    budgetBreakdown: {
    //   type: [        // removing array around type takes away Object Ids
      type: 
        {
          percent: {
            type: Number,
          },
          category: {
            type: String,
          },
        },
    //   ],
    //   type: Array,
    //   percent: {
    //     type: Number,
    //   },
    //   category: {
    //     type: String,
    //   },
      default: defaultBudgetCategories,
    },
  },
  {
    timestamps: true,
  }
);

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