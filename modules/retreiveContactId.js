const express = require("express");
const users = require("./userSchema");
const router = express.Router();
//
router.post("/retreiveContactId", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const {userId} = req.body;
        const isContact = await users.findOne({userName:userId});
        if(isContact ===null) return res.json({success:false});
        return res.json({success:true, content:isContact.userId});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;