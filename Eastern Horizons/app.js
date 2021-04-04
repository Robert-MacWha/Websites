const path = require('path');

const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const serveStatic = require('serve-static');

//* initialize the app & listen on port 3000
const app = express()
app.listen(3000);

//* setup the app
app.set('view engine', 'ejs');     // set the view engine to ejs

// setup middleware
app.use(                           // sass
  sassMiddleware({
    src: path.join(__dirname, '/sass'), 
    dest: path.join(__dirname, '/public/styles'),
    prefix: '/styles',
    outputStyle: 'compressed',
    debug: true
  })
);

app.use('/', serveStatic('./public')) // setup the static directory

//* routes
app.get('/', (req, res) => {     // index page
  res.render('index');
});

app.use((req, res) => {          // 404 page
  res.status(404).render('404');
});