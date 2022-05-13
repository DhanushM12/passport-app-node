require('dotenv').config()

const express = require('express');
const app = express();
const port=8000;
const passport = require('passport');
const bcrypt = require('bcrypt');
const users =[];

const initialize = require('./config/passportLocal');

initialize(passport, 
    email => users.find(user => user.email == email),
    id => users.find(user => user.id == id)
    )


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`)
})