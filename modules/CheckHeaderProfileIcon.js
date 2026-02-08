const express = require("express");
const router = express.Router();
//
router.get("/CheckHeaderProfileIcon", (req,res)=>{
    try{
        if(req.session.currentUser) return res.json({success:true});
        if(!req.session.currentUser) return res.json({success:false});
    }catch(err){
        console.error(err);
    }
})
//
module.exports = router;