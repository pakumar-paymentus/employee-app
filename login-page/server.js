const express = require("express");
const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.post("/login", (req, res) => {
    req.body.email
})

app.listen(8000);