const axios = require("axios");

const express = require("express");      // impoorting express library 
const app = express();            // creating app using express library

const path = require("path");   // importing path module 
const fs = require("fs");       // importing fs module



const bcrypt = require("bcrypt"); // bcrypt fpr hashing email and password

//Middleware
const bodyParser = require("body-parser");      
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//getting the auth function 
const {checkAuthentication} = require("./api/auth");

//redirects paths :

const loginPath = path.join(__dirname, "../public/login-page/login.html");
const welcomePath = path.join(__dirname, "../public/login-page/welcome.html");
const errorPath = path.join(__dirname, "../public/login-page/401error.html");



//home page that we wish to show when user come at our website
const staticPath = path.join(__dirname,"../public/login-page");
app.use(express.static(staticPath));

//home page showing
app.get("/", (req, res) => {
    res.send(staticPath);
})

//login page showing
app.get("/login", (req, res) => {
    res.sendFile(loginPath);
})

app.get("/welcome", (req, res) => {
    res.sendFile(welcomePath);
})

app.get("/401error", (req, res) => {
    res.sendFile(errorPath);
})

//hash the email id and password
hashCredentials = async (userEmail, userPass) => {
   const userEmailHash =  await bcrypt.hash(userEmail, 10);
   const userPassHash =  await bcrypt.hash(userPass, 10);

    return [userEmailHash, userPassHash];
}

//getting request from fetchApi for checking login credentials
app.post("/auth", (req, res) => {
    const userData = req.body;
    const userEmail = userData.email;
    const userPass = userData.password;

    //hash the credentials
    const userHashCredentials = hashCredentials(userEmail, userPass);
    userHashCredentials
    .then((user) => {
        const authStatusPromise = checkAuthentication(user[0], user[1]);
        return authStatusPromise;
    })
    .then((status) => {
        if(status === true){
            return res.redirect("/welcome");    //is credentials is authorized go to welcome windows 
        } 
        else 
        return res.redirect("/401error");       //otherwise goes to error window
    }) 
    .catch((err) => {
        console.log(err);
    })

})

app.listen(3000, () => {
    console.log("Listining to the port 3000");
})
