require("dotenv").config();         //config for dotenv for excessing variables
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
    },
    password :{
        type: String,
        required: true
    },
    conformPassword:{
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
   accessToken: String
})

//middleware method
registerSchema.methods.generateToken = async function(){
    
    try{
        // console.log("Hi it is you" + process.env.JWT_SECRET_KEY);
        const helper = {name:this.name, email:this.email};
        const token =  jwt.sign({helper}, `${process.env.JWT_SECRET_KEY}`);  //why is process.env.JWT_SECRET_KEY only not working 
        this.accessToken = token;
        await this.save()
        return token;
    }
    catch(err){
        console.log(err);
    }
}
// const accessToken = jwt.sign(userData, process.env.JWT_KEY);
registerSchema.pre("save", async function(next){
    
    this.password = await bcrypt.hash(this.password, 10);
    this.conformPassword = await bcrypt.hash(this.conformPassword, 10);
    next();

});

//model of schema
const registerUsersModel = new mongoose.model("RegisterUsers", registerSchema);     //pascal convention

module.exports = registerUsersModel