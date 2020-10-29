const Validator = require('validator');
const validText = require("./valid-text");
const validNumber = require("./valid-number")

module.exports = function validateTransactions(data) {
    let errors = {}

    data.transaction.description = validText(data.transaction.description) ? data.transaction.description : '';
    data.transaction.amount = validNumber(data.amount) ? data.transaction.amount : '';

    // no type validation for category (because it's a select) & date???

    // if (Validator.isEmpty(data.date)) {
    //     errors.date = 'Date is required';
    // }

    if (Validator.isEmpty(data.transaction.description)) {
        errors.description = 'Description is required';
    }

    // if (data.transaction.amount)) {
    //     errors.amount = 'Amount is required';
    // }

    // if (Validator.isEmpty(data.category)) {
    //     errors.category = 'Category is required';
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}

//  date: { type: Date, required: true },
//           // description: { type: String },
//           description: { type: String, required: true },
//           // amount: { type: Number },
//           amount: { type: Number, required: true },
//           // category: { type: String },
//           category: { type: String, required: true },
//         },