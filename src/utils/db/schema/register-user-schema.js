const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    }, 
    lastName:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email is already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    mobile:{
        type: Number,
        required: true,
    }, 
    dob:Date,
    token:{
        type: String
    }
    
})
const userSchema = new mongoose.model("Employees", registerSchema);     //pascal convention

module.exports = userSchema;
