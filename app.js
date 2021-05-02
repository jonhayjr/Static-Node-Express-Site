const express = require('express');
const data = require('./data.json')
const {projects} = data;
const app = express();

//View Engine Setup
app.set('view engine', 'pug');

//Static route setup
app.use('/static', express.static('public'));

//Routes to Home page
app.get( '/', (req, res, next) => {
    res.render('index', {projects});
  });

  //Routes to About page
  app.get( '/about', (req, res, next) => {
    res.render('about');
  });

  //Routes to individual project pages
  app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === projectId );
    if (project) {
      res.render('project', {project});
    } else {
      next();
    }
  });

  //404 Error Handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = 'Page Not Found';
    res.render('page-not-found', {error: {status: err.status, message: err.message, stack: err.stack}});
});

//Global Error Handler
// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || 'An internal server error has occurred.';
//   res.render({error: { status: errorStatus, message: errorMessage}})
// });

  //Listen on port 3000
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

