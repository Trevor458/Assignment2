var express = require('express');
var router = express.Router();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});


router.get(['/', '/home'], function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', page: 'about' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', page: 'projects' });
});

router.get('/contact', function(req, res) {
  res.render('contact', {
    title: 'Contact Me', page: 'contact',
    sent: req.query.sent === '1',
    error: '',
    form: {}
  });
});

router.post('/contact', async function(req, res) {
  const name = (req.body.name || '').trim().slice(0, 100);
  const email = (req.body.email || '').trim().slice(0, 200);
  const message = (req.body.message || '').trim().slice(0, 5000);
  const form = { name, email, message };

  const render = (status, error) =>
    res.status(status).render('contact', {
      title: 'Contact Me', page: 'contact', sent: false, error, form
    });

  if (!name || !email || !message) {
    return render(400, 'Please fill in all fields.');
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio site" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Portfolio message from ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
    res.redirect('/contact?sent=1');
  } catch (err) {
    console.error('Contact form email failed:', err.message);
    render(500, "Sorry, your message couldn't be sent. Please email me directly.");
  }
});


module.exports = router;
