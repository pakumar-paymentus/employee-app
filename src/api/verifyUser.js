const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const verifyUser = (token, secretKey) => {
    console.log(token);
    console.log(secretKey);
    jwt.verify(token, secretKey, (err, decodedData) => {
        console.log(decodedData);
    })
}

module.exports = verifyUser;