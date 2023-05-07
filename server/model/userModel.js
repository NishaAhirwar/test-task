const mongoose= require("mongoose");
const router= require('express').Router();

const userSchema= new mongoose.Schema({
    name: {type: String,
        unique: true,
        trim: true,
        required: true,},
    age:{type: Number,
        trim: true,
        required: true,},
    sex:{ type:String,
        required:true},
    mobile:{type:Number},
    govt_ID:{type: String},
    govtID_num:{type: String},
    guar:{type: String},
    email:{type: String},
    eContact:{type:Number},
    add:{type: String},
    state:{type: String},
    city:{type: String},
    pin:{type:Number},
    country:{type: String},
    occ:{type: String},
    rel:{type: String},
    mar_st:{type: String},
    bld_grp:{type: String},
    nat:{type: String}


    
},{
    timestamps:true

});

const User = new mongoose.model('User',userSchema);

module.exports= User;



