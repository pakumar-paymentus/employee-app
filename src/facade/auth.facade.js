//connect to database 
require("../utils/db/db-connect");

// register user schema
const userSchema = require("../utils/db/schema/register-user-schema");


module.exports = {
    userSchema
};

