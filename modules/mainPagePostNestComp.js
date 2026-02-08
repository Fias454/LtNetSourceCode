const express = require("express");
const posts = require("./postSchema");
const router = express.Router();
//
router.post("/mainPagePostNestComp", async(req,res)=>{
    try{
        const {beginFrom} = req.body;
        const proPosts = await posts.find().skip(beginFrom).limit(beginFrom+10);
        if(proPosts ===null) return res.json({success:false});
        return res.json({success:true, content:proPosts});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;