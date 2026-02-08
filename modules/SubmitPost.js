const express = require("express");
const posts = require("./postSchema");
const multer = require("multer");
const router = express.Router();
//
const upload = multer({
    dest:"./wow/",
})
//
router.post("/SubmitPost", upload.array("files"), async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const post = req.body;
        if(post.postTitle.length <= 3 || post.postDescription.length <=5) return;
        const isPostTitle = await posts.findOne({postTitle:post.postTitle});
        if(isPostTitle !==null) return res.json({success:false});
        const newPost = new posts({
            userId:req.session.currentUser,
            postTitle:post.postTitle,
            postDescription:post.postDescription
        });
        newPost.save();
        return res.json({success:true});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;