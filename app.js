const express = require("express");
const app = express();

const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const passport = require('passport');
const bodyParser = require("body-parser");
const path = require('path');

// Routes
const users = require("./routes/api/users");
const budgets = require("./routes/api/budgets");

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));


app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// Routes
app.use("/api/users", users);
app.use("/api/budgets", budgets);

app.get('/ok/hi', (req, res) => res.status(200).jsonp({}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
