const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
passport = require('passport');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
