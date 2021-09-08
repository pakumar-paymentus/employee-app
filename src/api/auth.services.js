const { authenticateUser } = require("../facade/auth.facade");

const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const resObj = await authenticateUser(email, password);
    
    //set token to cookie
    res.cookie("myToken", resObj.dataObj.token, {expire : new Date(Date.now()+30000)});
    res.json(resObj);

})

module.exports = router;