const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");


const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
});



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use("/users", usersRouter);
app.use("/posts", postsRouter);


module.exports = app;
