const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());

// require services
const services = require("./api/services");
app.use(services(app));


app.listen(PORT, () => {
    console.log(`Listining to the port ${PORT}`);
})
