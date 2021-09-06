const {userSchema} = require("../facade/auth.facade");


// register user
const registerUser = async(data) => {
    try{
        userData = await new userSchema(data);
        await userData.save();
    }catch(err){
        console.log("user schema is not defined, cannot connect to DB or input data of user is wrong" + err);
    }
}

const assignTokenToUser = async (email, token) => {
    const user = await userSchema.findOne({email});
    user.token = token;
    await user.save();
}

module.exports = {
    registerUser,
    assignTokenToUser
}
