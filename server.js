const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .catch(err => {
    console.log(err);
  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const forgotPassword = require('./routes/forgotPassword')
const resetPassword = require('./routes/resetPassword')
const updatePasswordViaEmail = require('./routes/updatePasswordViaEmail')
const reports = require('./routes/reports')

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/', forgotPassword);
app.use('/', resetPassword);
app.use('/', updatePasswordViaEmail);
app.use('/reports', reports);

// Serve static assets if in PROD
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});