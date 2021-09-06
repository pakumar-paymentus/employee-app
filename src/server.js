require("dotenv").config();
const { registerUser, assignTokenToUser } = require("../src/api/user.services");
const { authenticateUser, authorizeUser } = require("../src/api/auth.services");
const verifyUser = require("../src/api/verifyUser");
const cookie = require("cookie");

const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.use(express.json());

const path = require("path");

// use static paths which shows to client
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));


const router = express.Router();
app.use(router);


router.get("/", (req, res) => {
    res.send(staticPath);
})

router.get("/register", (req, res) => {
    res.send("<h3>Register here</h3>");
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
    const userCred = {
        "email": req.body.email,
        "password": req.body.password
    }
    const token = await authenticateUser(userCred.email, userCred.password);
    await assignTokenToUser(userCred.email, token);

    await res.setHeader('Set-Cookie', cookie.serialize('myToken', token, {
        httpOnly: true,
    }));
    // console.log(cookie.parse(req.headers.cookie || ''));
    verifyUser(token, process.env.JWT_KEY);
    res.send(userCred);
})
router.get("/login", (req, res) => {
    res.send("Welcome to homePage");
})

// router.post("/logout", (req, res) => {
//     res.clearCookie("myToken");
//     res.send("LOGIN PAGE");
// })


app.listen(PORT, () => {
    console.log(`Listining to the port ${PORT}`);
})
