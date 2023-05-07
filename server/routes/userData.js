const router = require('express').Router();
let User = require('../model/userModel');


router.route('/').post(function(req,res){
  
  const age = Number(req.body.age);
  const name = req.body.name;
  const sex = req.body.sex;
  const mobile= Number(req.body.mobile);
  const govt_ID = req.body.govID;
  const govtID_num = req.body.govIDnum;
  const guar = req.body.labelName + req.body.guarName;
  const email = req.body.email;
  const eContact= Number(req.body.eContact);
  const add = req.body.address;
  const state = req.body.stateName;
  const city = req.body.city;
  const pin= Number(req.body.pincode);
  const country = req.body.country;
  const occ = req.body.occupation;
  const rel = req.body.religion;
  const mar_st = req.body.maritalStatus;
  const bld_grp = req.body.bloodgrp;
  const nat = req.body.nationality;

  const newUser= new User({
   name, age, sex, mobile, govt_ID, govtID_num, guar, email, eContact, add, state, city, pin, country, occ, rel, mar_st, bld_grp, nat
  });

  newUser.save()
  .then(res=> console.log("user added"))
  .catch(err=>res.status(400).json("Err :"+ err));

})

  


router.route('/data').get((req, res) => {
   User.find()
   .then(users=> res.json(users))
   .catch(err=> res.status(400).json("Error: "+ err));  
  });
  
  

module.exports = router;