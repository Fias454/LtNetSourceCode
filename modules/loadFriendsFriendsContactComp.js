const express = require("express");
const users = require("./userSchema");
const router = express.Router();
//
router.post("/loadFriendsFriendsContactComp", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const currentUser = await users.findOne({userId:req.session.currentUser});
        if(currentUser ===null) return res.json({success:false});
        const total = [];
        for(let el of currentUser.userContacts){
            if(el ===null || el === currentUser.userId) return;
            const contact = await users.findOne({userId:el});
            total.push({name:contact.userName, online:contact.userCurrentSocketId});
        }
        return res.json({success:true, content:total});
    }catch(err){
        console.error(err);
    }
});
//
module.exports = router;