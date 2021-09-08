const express = require("express");
let router = express.Router();


module.exports = function (app)  {
    app.use("/api/user", require("./user.service"));
    app.use("/api/auth", require("./auth.services"));
    return router;
}
