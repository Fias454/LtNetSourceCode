const mongoose = require("mongoose");
//
const messageSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    fromUserId:{
        type:String
    },
    messages:{
        type:Array
    }
    
})
//
module.exports = mongoose.model("messages", messageSchema);