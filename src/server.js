const express = require("express");      // impoorting express library 
const app = express();            // creating app using express library

const path = require("path");   // importing path module 
const fs = require("fs");       // importing fs module
const {checkAuthentication} = require("./api/auth");


const bcrypt = require("bcrypt"); // bcrypt fpr hashing email and password

//Middleware
const bodyParser = require("body-parser");      
app.use(bodyParser.urlencoded({extended : false}));



//home page that we wish to show when user come at our website
const staticPath = path.join(__dirname,"../public/login-page");
app.use(express.static(staticPath));

//home page showing
app.get("/", (req, res) => {
    res.send(staticPath);
})

//login page showing
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login-page/login.html"));
})

//hash the email id and password

hashCredentials = async (userEmail, userPass) => {
   const userEmailHash =  await bcrypt.hash(userEmail, 10);
   const userPassHash =  await bcrypt.hash(userPass, 10);

    return [userEmailHash, userPassHash];
}



// checking authenticationa and serving to new tab
app.post("/login", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;

    const userHashCredentials = hashCredentials(userEmail, userPass);
    userHashCredentials
    .then((user) => {
        const authStatusPromise = checkAuthentication(user[0], user[1]);
        return authStatusPromise;
    })
    .then((status) => {
        if(status == true)
        res.send("You are authorized to login Window");
        else 
        res.status(401).send("login email or pasword is incorrect");
    }) 
    .catch((err) => {
        console.log(err);
    })
  
})


app.listen(3000, () => {
    console.log("Listining to the port 3000");
})
