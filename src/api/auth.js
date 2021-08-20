const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersPath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8")); // getting users credetials



// check login credentials
const checkAuthentication = async (userEmail, userPass) => {
    // console.log(userEmail);   here i'm checking that whether my email and password is hashed or not
    // console.log(userPass);
 
    try{
       for(let i = 0; i < users.length; i++){
           const user = users[i];
           const email = user.email;
           const pass = user.password;

           if(bcrypt.compare(email, userEmail) && bcrypt.compare(pass, userPass)){
               return true;
           }else return false;
       }
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    checkAuthentication
}
  