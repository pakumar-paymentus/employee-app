const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/loginDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
})
.then(() => console.log("connected to database"))
.catch(err => console.log("No Connection " + err));