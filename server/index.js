const express = require("express");
const mongoose=  require("mongoose");
const cors= require("cors");


require('dotenv').config();

const app=express();


app.set('view engines', 'ejs');
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userFormData",{ useNewUrlParser:true})
const connection= mongoose.connection;

connection.once('open', ()=>{
    console.log("Mongodb is running")
})

const userDataRoute = require('./routes/userData.js');

app.use('/',userDataRoute);

app.listen(5000, ()=>{
    console.log("Server is running")
})
