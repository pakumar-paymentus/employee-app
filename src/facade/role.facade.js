const {registerUser, assignTokenToUser} = require("../api/role.services");
const authenticateUser = require("../api/auth.services");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const router = express.Router();
app.use(router);


router.get("/login", (req, res) => {
    res.send("LOGIN PAGE");
})

router.post("/login", async (req, res) => {
    const userCred = {
        email : req.body.email,
        password: req.body.password
    }
    const token = await authenticateUser(userCred.email, userCred.password);
    await assignTokenToUser(userCred.email, token);
    res.cookie("jwt", token);
    res.send(token);
   
});

router.post("/register", async(req, res) => {
    const userData = req.body;
    await registerUser(userData);
    res.json(req.body);
})

module.exports = router