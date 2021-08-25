const axios = require("axios");

const express = require("express");      // impoorting express library 
const app = express();            // creating app using express library

const path = require("path");   // importing path module 
const fs = require("fs");       // importing fs module



const bcrypt = require("bcrypt"); // bcrypt fpr hashing email and password

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//getting the auth function 
const { checkAuthentication } = require("./api/auth");

//redirects paths :

const loginPath = path.join(__dirname, "../public/login-page/login/login.html");
const home = path.join(__dirname, "../public/login-page/homepage/home.html");
const errorPath = path.join(__dirname, "../public/login-page/error/error.html");



//home page that we wish to show when user come at our website
const staticPath = path.join(__dirname, "../public/login-page");
app.use(express.static(staticPath));

//home page showing
app.get("/", (req, res) => {
    res.send(staticPath);
})

//login page showing
app.get("/login", (req, res) => {
    res.sendFile(loginPath);
})

//getting request from fetchApi for checking login credentials
app.post("/auth", (req, res) => {
    const userData = req.body;
    const userEmail = userData.email;
    const userPass = userData.password;
    const status = checkAuthentication(userEmail, userPass);
    if (status === true) {
        return res.send({
            status: true,
            data: {
                name: "std"
            }
        });
        
    } else {
        // return false;
        res.status(401).send({ status: false,
            err : {
                msg : "username or password is incorrect"
            }
        });
    }
})

app.listen(3000, () => {
    console.log("Listining to the port 3000");
})
