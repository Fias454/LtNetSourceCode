const express = require("express");
const users = require("./userSchema");
const messages = require("./messageSchema");
const router = express.Router();
//
router.post("/getMessages", async(req,res)=>{
    try{
        const {contactId} = req.body;
        const contact = await users.findOne({userName:contactId});
        if(contact ===null) return res.json({success:false});
        const msgbundle = [];
        if(messages ===null) return res.json({success:false});
        const msgs = await messages.findOne({userId:contact.userId});
        if(msgs ===null) return res.json({success:false});
        msgbundle.push(msgs.messages);
        res.json({success:true, content:msgbundle});
    }catch(err){
        console.error(err);
    }
});
//
module.exports = router;