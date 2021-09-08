//connect to database
require("../utils/db/db-connect");
// register user schema
const userSchema = require("../utils/db/schema/register-user-schema");

const registerMyUser = async (user) => {
    try {
        const userData = await new userSchema(user);
        await userData.save();
        resObj = saveData = {
            "dataObject": userData,
            "errorObj": null,
            "messageObj": "You are now registered"
        };
        return resObj;

    } catch (err) {
        resObj = {
            "dataObject": null,
            "errorObj": err,
            "messageObj": "email or phone already registered, if not try again later"
        }
        return resObj
    }
}

module.exports = {
    registerMyUser
}

