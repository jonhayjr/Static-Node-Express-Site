const express = require('express');
const data = './data.json'
const app = express();

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get( '/', ( req, res ) => {
    res.locals.projects = data.projects;
    console.log(res.locals.projects)
    res.render('index', res.locals.projects);
  });

  app.get( '/about', ( req, res ) => {
    res.render('about');
  });
  
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});

