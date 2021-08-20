const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8")); // getting users credetials



// check login credentials
const checkAuthentication = async (userEmail, userPass) => {
    try{
        const user = users.find(x => x.email === userEmail);

      if(user != undefined){
        if(user.password === userPass) return true;
        else return false;
      }else return false;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    checkAuthentication
}
  