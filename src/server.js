require("dotenv").config();

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

const services = require("../src/api/services");
app.use("/api", services);



app.listen(PORT, () => {
    console.log(`Listining to the port ${PORT}`);
})
