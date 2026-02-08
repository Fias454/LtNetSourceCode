const express = require("express");
const users = require("./userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
//
router.post("/LogIn", async(req,res)=>{
    try{
        const {userName,userPassword} = req.body;
        if(userName.length <3 || userPassword.length <3) return res.json({success:false});
        const isUser = await users.findOne({userName: userName});
        if(isUser === null) return res.json({success:false});
        const isPassword = await bcrypt.compare(userPassword, isUser.userPassword);
        if(!isPassword) return res.json({success:false});
        req.session.currentUser = isUser.userId;
        return res.json({success:true});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;