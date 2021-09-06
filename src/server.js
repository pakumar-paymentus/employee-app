require("dotenv").config();
const role_facade = require("./facade/role.facade");




const PORT = process.env.PORT || 3000;

const express = require("express");     
const app = express();      

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const path = require("path");        

// use static paths which shows to client
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));


const router = express.Router();
app.use(router);


router.get("/", (req,res) => {
    res.send(staticPath);
})

app.use("/api", role_facade);
// app.use("/login", role_facade);


app.listen(PORT, () => {
    console.log(`Listining to the port ${PORT}`);
})
