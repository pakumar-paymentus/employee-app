const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser"); //Middleware
app.use(bodyParser.urlencoded({extended : false}));
const users = JSON.parse(fs.readFileSync("../users.json", "utf-8"));


const staticPath = path.join(__dirname,"../login-page");
console.log(staticPath);
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.send(staticPath);
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../login-page/login.html"));
})



checkAuthentication = (useremail, userpass) => {
    for(let i = 0; i < users.length; i++){
        let user = users[i];
        let email = user.email;
        let password = user.password;

        if(email == useremail && password == userpass){
            return true;
        }else return false;
    }
    return false
}

app.post("/login", (req, res) => {
    const useremail = req.body.email;
    const userpass = req.body.password;
    if(checkAuthentication(useremail, userpass) == true){
        res.send("Autharize to login Window");
    }else{
        res.send("You are not authorized");
    }
})


app.listen(3000, () => {
    console.log("Listining to the port 3000");
})
