const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/companyDB", {
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected to database"))
.catch(err => console.log("No connection" + err));