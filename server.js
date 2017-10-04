var log = msg => console.log(msg);

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var info = `${now}: ${req.method} ${req.url}`;

  log(info);
  fs.appendFile('server.log', info + '\n',e => e ? log('Unable to save server.log') : null);
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    url: req.url,
    base: req.host,
    ip: req.ip
  });
});


hbs.registerHelper('getYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home page',
    msg: 'Welcome to web site'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error message'
  });
});

app.listen(3000, () => {
  log('Server is up on port: 3000');
});