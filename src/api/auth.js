const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usersPath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8")); // getting users credetials



// check login credentials
const checkAuthentication = (userEmail, userPass) => {
       for(let i = 0; i < users.length; i++){
        if (users[i].email === userEmail){
            const password = users[i].password;
            if(password == userPass){
                return true;
            }else {
                return false;
            }
        }
       }
       return false;
    }

//hash the email id and password
// hashCredentials = async (userEmail, userPass) => {
//     const userEmailHash =  await bcrypt.hash(userEmail, 10);
//     const userPassHash =  await bcrypt.hash(userPass, 10);
 
//      return [userEmailHash, userPassHash];
//  }

module.exports = {
    checkAuthentication
}
  