const mongoose = require("mongoose");
//
const postSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    postTitle:{
        type:String
    },
    postDescription:{
        type:String
    }
})
//
module.exports = mongoose.model("post", postSchema);