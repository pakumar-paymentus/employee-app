require("dotenv").config();
require("../utils/db/db-connect");
const userSchema = require("../utils/db/schema/register-user-schema");
const jwt = require("jsonwebtoken");


authenticateUser = async (email, password) => {
    try{
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
    catch(err){
        console.log(err);
    }
}

authorizeUser = async(token, secretKey) => {
    try{
        decodedData = await jwt.verify(token, secretKey)
        if(decodedData === undefined){
            return "someting went wrong please login again";
        }else{
            return "Welcome to homePage";
        }
    }catch(err){
        console.log("token is not verified or it expire" + err);
    }
}

module.exports = {
    authenticateUser,
    authorizeUser
}