require("../utils/db/db-connect");
const userSchema = require("../utils/db/schema");


const registerUser = async(data) => {
    userData = await new userSchema(data);
    await userData.save();
}

const assignTokenToUser = async (email, token) => {
    const user = await userSchema.findOne({email});
    user.set({"token":token});
    
}

module.exports = {
    registerUser,
    assignTokenToUser
}