const express = require('express');
const data = require('./data.json');
const {projects} = data;
const app = express();
const port = process.env.PORT || 3000;


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

 //Routes to Error page and throws custom error message
 app.get('/error', (req, res, next) => {
    const err = new Error();
    err.message = err.message || `Oops, something went wrong!`;
    res.status(err.status = err.status || 500).render('error', {err});
    console.log(`An error has occurred: ${err.status} - ${err.message}`);
});

//Routes to project/error page and throws custom error message
app.get('/project/error', (req, res, next) => {
  const err = new Error();
  err.message = err.message || `Oops, something went wrong!`;
  res.status(err.status = err.status || 500).render('error', {err});
  console.log(`An error has occurred: ${err.status} - ${err.message}`);
});



  //Routes to individual project pages
  app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === projectId );
    //Checks if project data exists for specific id.  If not, a 404 error is thrown.
 
    if (project) {
      res.render('project', {project});
    } else {
      const err = new Error();
      err.status = 404;
      err.message = 'Page not found';
      //Passes error to global error handler
      next(err);
    }
  });


//404 Error Handler to catch undefined routes
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Page Not Found';
  res.render('page-not-found', {err});
});

//Global Error Handler
app.use((err, req, res, next) => {
  
  //Log error to console
    console.log(`${err.status} - ${err.message}`);
    //Throws Page Not Found error for 404 errors and generic error for all other errors.
    if (err.status === 404) {
      res.status(err.status).render('page-not-found', {err});
    } else {
      err.message || 'Oops, something went wrong!'; 
      res.status(err.status || 500).render('error', {err});
    }
});

//Listening on port 
app.listen(port, () => {
    console.log(`The application is running on port ${port}!`);
});

