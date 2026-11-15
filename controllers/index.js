var express = require('express');
var router = express.Router();


/* GET home page. */

router.get(['/', '/home'], function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', page: 'about' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', page: 'projects' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me', page:'contact', sent: false, sentName: '' });
});

router.post('/contact', function(req, res, next) {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  res.render('contact', { title: 'Contact Me', page: 'contact', sent: true, sentName: name });
});

module.exports = router;
