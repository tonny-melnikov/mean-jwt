const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const config = require('./config.js');

const app = express();
const port = process.env.PORT || 8080;

const users = require('./routes/users');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// app.use( bodyParser.urlencoded({
    //     "limit": "50mb",
    //     "extended": true
    // }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./passport')(passport);

app.get('/', (req, res) => {
    res.send('Hello from app.js');
});

app.use('/users', users);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// // catch 404 and forward to error handler
// app.use(( req, res, next ) => {
//     console.log('404 page!');
//     const err = new Error( "Not Found" );
//     err.status = 404;
//     next( err );
// });

// // error handler
// app.use((err, req, res, next) => {
//     res.json(err);
// });

mongoose.connect(config.db, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
})
.then(() => {
    console.log('Connection to DB successed.')
    app.listen(port, () => {
        console.log(`Listnening ${port} port...`);
    });
})
.catch(err => console.log(err));

module.exports = app;