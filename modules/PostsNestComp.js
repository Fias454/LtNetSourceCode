const express = require("express");
const posts = require("./postSchema");
const router = express.Router();
//
router.get("/PostsNestComp", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const proPosts = await posts.find().limit(8);
        if(proPosts ===null) return res.json({success:false});
        return res.json({success:true, content:proPosts});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;