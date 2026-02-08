const mongoose = require("mongoose");
//
const userSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    userPassword:{
        type:String
    },
    userContacts:{
        type:Array
    },
    userCurrentSocketId:{
        type:String
    }
});
//
module.exports = mongoose.model("user", userSchema);