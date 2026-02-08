const express = require("express");
const users = require("./userSchema");
const router = express.Router();
//
router.get("/nestMainPageShowContacts", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const usersBatch = await users.find();
        if(usersBatch ===null) res.json({success:false});
        const info = [];
        usersBatch.forEach(el=>{
            if(el.userId === req.session.currentUser) return;
            info.push(`${el.userName};${el.userId}`);
        })
        const usersReady={
            usersInfo:info
        }
        return res.json({success:true, content:usersReady});
    }catch(err){
        console.error(err)
    }
})
//
module.exports = router;