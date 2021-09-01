const jwt = require("jsonwebtoken");

const express = require("express");      // impoorting express library 
const app = express();            // creating app using express library

const path = require("path");   // importing path module 
const fs = require("fs");       // importing fs module

require("../src/db/connect");

const registerUsersModel = require("../src/model/userSchema");

const bcrypt = require("bcrypt"); // bcrypt fpr hashing email and password

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



// getting the auth function 
// const { checkAuthentication } = require("./api/auth");

//redirects paths :

const loginPath = path.join(__dirname, "../public/login-page/login/login.html");
const home = path.join(__dirname, "../public/login-page/homepage/home.html");
const errorPath = path.join(__dirname, "../public/login-page/error/error.html");
const homePagePath = path.join(__dirname, "../public/login-page/homepage/home.html");
const registerPagePath = path.join(__dirname, "../public/registration-page/register.html");



//home page that we wish to show when user come at our website
const staticPath = path.join(__dirname, "../public/login-page");
app.use(express.static(staticPath));

//home page showing
app.get("/", (req, res) => {
    res.send(staticPath);
})

app.get("/register",(req, res) => {
    res.sendFile(registerPagePath);
})
app.post("/register", async (req, res) => {
   try{
       if(req.body.password === req.body.conformPassword){
        const userData = new registerUsersModel(req.body);

        const token = await userData.generateToken();
        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        });
        
        const createUser = await userData.save();
        res.status(201).sendFile(loginPath); 
       }else{
           return res.status(400).send("password and conform password didn't match");
       }
   }
   catch(err){
    res.status(500).send("Bad request to server" + err);
   }
})


//end point for login page
app.get("/login", (req, res) => {
    res.sendFile(loginPath);
})

//end point for home page
app.get("/home", (req, res) => {
    // res.sendFile(homePagePath);
  const userToken = req.headers.token;
  console.log(userToken);
  if(userToken === undefined) res.sendStatus(401) ;     //unauthorized

  jwt.verify(userToken, process.env.JWT_KEY, (err, decoded) => {
      if(err) res.sendStatus(403);      //forbidden client error status
        console.log("verified person");
      res.sendFile(homePagePath);
  })

})

//getting request from fetchApi for checking login credentials
app.post("/auth", async (req, res) => {
    const userData = req.body;      //user information firstName, lastName, email, password, conformPassword, age, mobile

    const email = userData.email;
    const password = userData.password;

    const user = await registerUsersModel.findOne({email:email});
    if(user == undefined){
        return res.status(401).send("email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);  //(typed password, database password)
    
    const token = await user.generateToken();   //generate token at the time of login for users

    res.cookie("accessToken", token, {          //store token in cookies
        expires: new Date(Date.now() + 50000),
        httpOnly: true
    });
    console.log(isMatch);           //**brypt.compare is not perfectly working 
    if(isMatch){
        res.status(201).send("You are authorized now");
    }
    else{
        return res.status(401).send("email or password is incorrect");
    }
    // // const status = checkAuthentication(userEmail, userPass);
    // if (status === true) {
    //     const accessToken = jwt.sign(userData, process.env.JWT_KEY);
    //     res.json({
    //         accessToken: accessToken,
    //         status: true
    //     });
    // } else {
    //     // return false;
    //     res.sendStatus(401);
    // }
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