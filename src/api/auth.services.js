require("dotenv").config();
require("../utils/db/db-connect");
const userSchema = require("../utils/db/schema");
const jwt = require("jsonwebtoken");


authenticateUser = async (email, password) => {
    const user = await userSchema.findOne({email});
    if(user == undefined){
        return "you are not registered";
    }else if(user.password === password){
        //generate JWT token and assign to user
        const helper = {"name": user.firstName,"email": email}
        const token = await jwt.sign(helper, process.env.JWT_KEY);
        
        //now store generated token in cookies
        return token;
    }else{
        return "email or password is incorrect";
    }
}

module.exports = authenticateUser;