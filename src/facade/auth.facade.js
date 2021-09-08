//connect to database
require("../utils/db/db-connect");
const userSchema = require("../utils/db/schema/register-user-schema");

const jwt = require("jsonwebtoken");


authenticateUser = async (email, password) => {
    const user = await userSchema.findOne({ email });
    if (user == undefined) {
        const resObj = {
            "dataObj": null,
            "messageObj": "you are not registered",
        }
        return resObj;
    } else if (user.password === password) {
        //generate JWT token and assign to user
        const helper = { "name": user.firstName, "email": email }
        const token = await jwt.sign(helper, process.env.JWT_KEY);

        const resObj = {
            "dataObj": {
                "token": token,
            },
            "messageObj": "Welcome to HomePage"
        }
        return resObj;
    } else {
        const resObj = {
            "dataObj": null,
            "messageObj": "email id or password is incorrect"
        }
        return resObj;
    }
}

module.exports = {
    authenticateUser
}