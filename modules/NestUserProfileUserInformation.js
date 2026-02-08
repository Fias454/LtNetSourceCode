const express = require("express");
const users = require("./userSchema");
const router = express.Router();
//
router.get("/NestUserProfileUserInformation", async(req,res)=>{
    try{
        if(!req.session.currentUser) return res.json({success:false});
        const user = await users.findOne({userId:req.session.currentUser});
        if(user ===null) return res.json({success:false});
        const userInfo = {
            userName:user.userName,
        }
        
        return res.json({success:true, content:userInfo});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;