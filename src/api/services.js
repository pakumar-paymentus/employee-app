require('dotenv').config({ path: "../.env"});
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

const router = express.Router();
app.use(router);
app.use(cookieParser);


const { registerUser, assignTokenToUser } = require("../api/user.services");
const { authenticateUser, authorizeUser } = require("../api/auth.services");



router.get("/login", (req, res) => {
    res.send("welcome to login page");
})

router.get("/register", (req, res) => {
    res.send("welcome to register page");
})

router.post("/register", async (req, res) => {
    try {
        const userData = req.body;
        await registerUser(userData);
        res.send(userData);
    } catch (err) {
        res.send(err);
    }
})


router.post("/login", async (req, res) => {
    try{
        const userCred = {
            "email": req.body.email,
            "password": req.body.password
        }
        const token = await authenticateUser(userCred.email, userCred.password);
        await assignTokenToUser(userCred.email, token);
        res.cookie("myToken",token);
        res.send(userCred);
    }
    catch(err){
        console.log(err);
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("myToken");    
    res.send("Welcome to login page");
});

router.get("/home", async(req, res) => {
    try{
        const value = req.cookie.myToken;
        console.log(value);
    }catch(err){
        console.log(err);
    }
    // res.send(await authorizeUser(req.cookie.myToken, process.env.JWT_KEY));
})



module.exports = router;
