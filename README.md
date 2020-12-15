# Welcome to Making Cent$!
<p align="center">
    <a href="https://making--cents.herokuapp.com/#/" target="_blank">
        <img width="50%" src="images/making-cent$-logo.png" alt="Making Cent$ logo">
    </a>
</p>

## Table of Contents

  * [About Making Cent$](#about-making-cent$)
  * [Technologies](#technologies)
  * [Features](#features)
    * [User Authentication](#user-authentication)
    * [Budget Categories](#budget-categories)
    * [Transactions (CRUD)](#transactions-crud)
    * [Notifications](#notifications)
    * [Animating Budget Split and Amount Spent](#animating-budget-split-and-amount-spent)
  * [Authors](#authors)

## About Making Cent$

MakingCent$ is a budgeting app that allows users to break down their income into categories based on percentage. Users can set aside a percentage of their savings which is encouraged through a visual component that helps them track how they’re doing with their goals. Users will be notified if they exceed the budget breakdown they initially allocated. Users can also manually add, edit and remove transactions.

In the backend, Making Cent$ was built using Express. In terms of database, MongoDB was used to store data. In the frontend, React and Redux were used to create a single-page web application to enable smooth navigation for users.

## Technologies

* MongoDB
* Express
* NodeJS
* React
* Redux
* Axios
* Chart.js
* React Notification System

## Features

The following is a list of all of the features available on Making Cent$.

#### User Authentication

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/user_auth.gif)

* Users can log in or sign up to start using the different features.
* Users can skip signing up by clicking on the demo user - they will be redirected to the demo user's dashboard.

#### Budget Categories

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/budget.gif)

* On their dashboard, users can click on a button that will take them to a page where they are able to update their income split (budget split page).
* Users can input their income and their budget split amounts will update accordingly.
* There is a default budget split set up that users can change.
* If users are not happy with the new budget split they allocated, there is a button to discard the changes and go back to the previous budget split.

### Transactions (CRUD)

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/transactions.gif)

* On the dashboard, users can add transactions by inputting a date, description, amount and category.
* Users can edit a transaction by clicking on the edit icon. A second row will pop up under it where users can edit the information.
* Users can delete a transaction by clicking on the delete icon.

### Notifications

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/notifications.gif)

* When adding a new transaction or editing an existing one, users will receive a notification if the category's total transactions exceed the budget they had initially allocated.

### Animating budget split and amount spent 

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/animation2.gif)

* On the budget split page, a chart will reflect the budget split the users allocate. This chart updates in real time and animates every time the users move the sliders.

![Alt Text](https://github.com/michellenaim/MERN/blob/main/screenshots/animation1.gif)

* On the dashboard, users will first see the chart mentioned above. Underneath it, users will see a chart reflecting their transactions in relation to their budget split allocation. They will also see their remaining budget for the month.

## Code Snippets

### Updating Transactions

New information received from the frontend is deconstructed through the body of the request. The information in the backend, stored underneath the transactions key as an embedded document within the user model, is accessed and set to the new information. The transaction ID stored in the backend must be converted to the same type as the ID in the body of the request to find and match the transaction. 

Asynchronous functions in the request handlers allow for the promises to be resolved through use of the await keyword which ensures the changes are saved prior to sending information to the frontend.

```js
// update a transaction 
router.patch("/update", [
  check('date').not().isEmpty().withMessage("Date cannot be empty"),
  check('description').not().isEmpty().withMessage("Description cannot be empty"),
  check('amount').isNumeric().withMessage("Amount should be a number"),
  check('amount').not().isEmpty().withMessage("Amount cannot be empty"),
  check('category').not().isEmpty().withMessage("Category cannot be empty"),
  ],
  passport.authenticate('jwt', { session: false }), 
    async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    try {

      const { date, amount, description, category } = req.body;

      req.user.transactions.forEach(originalT => {
        if (originalT._id.toString() === req.body._id) {
          originalT.date = date;
          originalT.amount = amount;
          originalT.description = description;
          originalT.category = category;
        }
      })

      await req.user.save();

      // return the information from backend
      res.status(200).json({
        transactions: req.user.transactions,
      });
    } catch (errors) {
      
      return res.status(422).json({
        ...errors,
      });
    }   
});
```

### Filtering Transactions by Category

An event handler is utilized to update the transactions table per category type. Dynamic CSS rendering via redux state illustrates the selected category. The list of transactions re-render seemlessly per category type, obtained through an action that fetches the respective transactions which are filtered on the backend.

Event handler:
```js
  handleCategory(type) {
    return (e) => {
        e.preventDefault()

        this.props.fetchFilteredTransactions(type)

        this.CATEGORY_KEYS.forEach((category) => {
            if (type === category) {
                this.setState({
                    [type]: "selected",
                })
            } else{
                this.setState({
                    [category]: '',
                    All : ''
                })
            }
        }) 

        if (type === "/") {
            this.setState({
                All: "selected"
            })
        }
    }
  }
```

Transaction category buttons:
```js
  <div className="transaction-category-buttons">
    <button 
      onClick={this.handleCategory("/")} 
      className={this.state.All}
    >
      All
    </button>
    <button 
      onClick={this.handleCategory("Home")} 
      className={this.state.Home}
    >
      Home
    </button>
    <button 
      onClick={this.handleCategory("Utilities")} 
      className={this.state.Utilities}
    >
      Utilities
    </button>
    {/* ... etc */}
  </div>
```

### Authors
- Aishwarya Nair
- Lili Gevorkian
- Michelle Naim
- Michael Castanieto