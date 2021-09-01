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

module.exports = {
    checkAuthentication
}
  