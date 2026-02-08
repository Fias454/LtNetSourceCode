const express = require("express");
const users = require("./userSchema");
const router = express.Router();
//
router.get("/nestFriendsInFriendsPage", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const currentUser = await users.findOne({userId:req.session.currentUser});
        const info = [];
        for(let contact of currentUser.userContacts){
            const isContact = await users.findOne({userId:contact});
            if(isContact ===null || contact === req.session.currentUser ) return;
            info.push(`${isContact.userName};${isContact.userId}`);
        }
        const usersReady={
            usersInfo:info
        }
        return res.json({success:true, content:usersReady});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;