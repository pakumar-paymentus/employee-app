const { registerMyUser } = require("../facade/user.facade");
const express = require("express");
let router = express.Router();

router.post("/register", async (req, res) => {
    const data = req.body;
    const responseObj = await registerMyUser(data);
    res.send(responseObj);

})

router.post("/logout", (req, res) => {
    res.clearCookie("myToken")
    res.json({ "messageObj": "you are successfully Logout" });
})

// router.get("/home", async (req, res) => {
//     const token = req.cookies.myToken;
//     if (token === undefined) {
//         res.send({ "messageObj": "you are not authorize" });
//     } else
//         res.send("Welcome to homePage");
// })


module.exports = router;