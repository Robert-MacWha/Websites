const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// create express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://default:1234@node-tutorial.m42sf.mongodb.net/node-tutorial?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    // listen for requests once connected to db
    app.listen(3000);

})
.catch(err => {

    console.error(err);

});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// blog routes
app.use('/blogs', blogRoutes);

// 404s
app.use((req, res) => {
    res.status(404).render('404');
});