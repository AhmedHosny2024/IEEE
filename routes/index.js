var express = require('express');
var router = express.Router();
const admin=require("../models").admin;
const db =require('../models/admin');
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
  const API_KEY='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' ; 
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

  admin.create({
    Name:name,
    email:email,
    univresity: uni,
    workshop: work,
    gender: gender,
  }).then((admin)=>{
    res.render("recivedata",{ name, email,gender,uni,work});
  }).catch(console.error);
});

router.get('/users/tables', function(req, res, next) {
   admin.findAll()
   .then((users)=>{
    //console.log(users),
    res.render('tables', { title: 'User tables',  users});
});
})


module.exports = router;
