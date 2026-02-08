const express = require("express");
const users = require("./userSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
//
router.post("/SignUp", async(req,res)=>{
    try{
        const {userName,userPassword} = req.body;
        if(userName.length <3 || userPassword.length <3) return res.json({success:false});
        const isUser = await users.findOne({userName: userName});
        if(isUser !== null) return res.json({success:false});
        const userId = await bcrypt.hash(userName, 4);
        const hashedPassword = await bcrypt.hash(userPassword, 15);
        const newUser = new users({
            userId:userId,
            userName:userName,
            userPassword:hashedPassword,
            userCurrentSocketId:null,
            userContacts : []
        });
        newUser.save();
        req.session.currentUser = userId;
        return res.json({success:true});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;