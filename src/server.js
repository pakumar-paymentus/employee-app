require("dotenv").config();         //config for dotenv for excessing variables
const jwt = require("jsonwebtoken");
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
const homePagePath = path.join(__dirname, "../public/login-page/homepage/home.html");



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

app.get("/home", (req, res) => {
    // const userToken = window.localStorage.getItem('user');
    res.sendFile(homePagePath); 
    // if (userToken === undefined) r
    // es.sendStatus(401);   // unauthorized user

    // jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
    //     if (err => res.sendStatus(403));     // Forbidden client error status

    //     res.sendFile(homePagePath);
    // })

})

//getting request from fetchApi for checking login credentials
app.post("/auth", (req, res) => {
    const userData = req.body;
    const userEmail = userData.email;
    const userPass = userData.password;
    const status = checkAuthentication(userEmail, userPass);
    if (status === true) {
        const accessToken = jwt.sign(userData, process.env.JWT_KEY);
        res.json({
            accessToken: accessToken,
            status: true
        });
    } else {
        // return false;
        res.sendStatus(401);
    }
})

// getting request from fetchApi for checking logout
app.post("/logout", (req, res) => {
    const userToken = req.body.token;

    // console.log(userToken);

    if (userToken === undefined) return res.sendStatus(401)     // unauthorized user
    jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
        if (err => res.sendStatus(403));     // Forbidden client error status

        res.send(true);
    })
})

app.listen(3000, () => {
    console.log("Listining to the port 3000");
})
