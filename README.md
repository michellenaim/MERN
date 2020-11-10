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



* On their dashboard, users can click on a button that will take them to a page where they are able to update their income split (budget split page).
* Users can input their income and their budget split amounts will update accordingly.
* There is a default budget split set up that users can change.
* If users are not happy with the new budget split they allocated, there is a button to discard the changes and go back to the previous budget split.

### Transactions (CRUD)

* On the dashboard, users can add transactions by inputting a date, description, amount and category.
* Users can edit a transaction by clicking on the edit icon. A second row will pop up under it where users can edit the information.
* Users can delete a transaction by clicking on the delete icon.

### Notifications

* When adding a new transaction or editing an existing one, users will receive a notification if the category's total transactions exceed the budget they had initially allocated.

### Animating budget split and amount spent 

* On the budget split page, a chart will reflect the budget split the users allocate. This chart updates in real time and animates every time the users move the sliders.
* On the dashboard, users will first see the chart mentioned above. Underneath it, users will see a chart reflecting their transactions in relation to their budget split allocation. They will also see their remaining budget for the month.

### Authors
- Aishwarya Nair
- Lili Gevorkian
- Michelle Naim
- Michael Castanieto