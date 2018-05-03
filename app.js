const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Middleware to connect to mondoDB server
//Make sure to start server. "Mongod" is the command. Switch to "D:" drive first ya dumbo
mongoose.connect(config.database);

//What to do when connected
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);
})

//notifies if error connecting to server
//Though my command prompt would yell at me first before I'd need to use this during production anyways
mongoose.connection.on('error', () => {
    console.log('Database error' + config.database);
})

//initialize app variable with express
const app = express();

const users = require('./routes/users');

//sets port
const port = 3000;

//cors middleware to allow cross origin requests
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Route to Index Page
app.get('/', (req, res) => {
    res.send('Invalid Enpoint');
});

//Starts the server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});