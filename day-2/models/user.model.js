const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"customer",
        enum:["seller","customer","buyer"],
    }
},{timestamps:true});

const userModel = mongoose.model("User", userSchema); 

module.exports ={
    userModel
}