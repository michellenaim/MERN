const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultBudgetCategories = [
  {
    percent: 0.3,
    category: "Home",
    incomeSplit: 300,
  },
  {
    percent: 0.1,
    category: "Utilities",
    incomeSplit: 100,
  },
  {
    percent: 0.2,
    category: "Food",
    incomeSplit: 200,
  },
  {
    percent: 0.1,
    category: "Transportation",
    incomeSplit: 100,
  },
  {
    percent: 0.1,
    category: "Health & Fitness",
    incomeSplit: 100,
  },
  {
    percent: 0,
    category: "Shopping",
    incomeSplit: 0,
  },
  {
    percent: 0.1,
    category: "Entertainment",
    incomeSplit: 100,
  },
  {
    percent: 0.1,
    category: "Savings",
    incomeSplit: 100,
  },
  {
    percent: 0,
    category: "Other",
    incomeSplit: 0,
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
      default: 1000,
    },
    budgetBreakdown: {
      type: [
        // removing array from the value of type takes away Object Ids
        {
          percent: { type: Number },
          category: { type: String },
          incomeSplit: { type: Number },
        },
      ],
      default: defaultBudgetCategories,
    },
    transactions: {
      type: [
        {
          // JavaScript ISO Dates ISO 8601 is the international standard
          // ISO 8601 format: "2020-10-29"
          date: { type: Date },
          // date: { type: Date, required: true },
          amount: { type: Number },
          // amount: { type: Number, required: true },
          description: { type: String },
          // description: { type: String, required: true },
          category: { type: String },
          // category: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('User', UserSchema)

// user schema (working model)
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

   
// how child schemas work to be embedded in a parent schema
// const childSchema = new Schema({ name: 'string' });

// const parentSchema = new Schema({
//     // Array of subdocuments
//     children: [childSchema],
//     // Single nested subdocuments. Caveat: single nested subdocs only work
//     // in mongoose >= 4.2.0
//     child: childSchema
// });