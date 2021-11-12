var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/form', function(req, res, next) {
  res.render('ieeeform');
});

router.post('/form', function(req, res, next) {
  let name =req.body.name;
  let email=req.body.email;
  let gender=req.body.gender;
  let uni=req.body.university;
  let work=req.body.workshops;

  const sgMail = require('@sendgrid/mail')
  const API_KEY='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';
sgMail.setApiKey(API_KEY)
const msg = {
  to: email, // Change to your recipient
  from: 'eng.ahmedhosny2024@gmail.com', // Change to your verified sender
  subject: 'configuration mail',
  text: 'we recive your form and will contact you as soon as possible',
  html: '<strong>we recive your form and will contact you as soon as possible</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  res.render('recivedata', { name, email,gender,uni,work});
});



module.exports = router;
//data work here