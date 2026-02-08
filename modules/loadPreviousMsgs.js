const express = require("express");
const users = require("./userSchema");
const messages = require("./messageSchema");
const router = express.Router();
let count = 0;
//
router.post("/loadPreviousMsgs", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const {contactId} = req.body;
        if(contactId ===null) return res.json({success:false});
        const current = await users.findOne({userId:req.session.currentUser});
        const isContact = await users.findOne({userName:contactId});
        if(isContact ===null) await res.json({success:false});
        const msgPack = await messages.findOne({
            $or:[
                {fromUserId:req.session.currentUser, userId:isContact.userId},
                {fromUserId:isContact.userId, userId:req.session.currentUser},
            ]
        });
        console.log(msgPack);
        res.json({success:true, content:{msgs:msgPack, currentId:current.userName}});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;