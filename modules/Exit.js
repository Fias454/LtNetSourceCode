const user = require("./userSchema");
//
const Exit = socket=>{
    socket.on("disconnect", async()=>{
        const current = await user.findOne({userId:socket.request.session.currentUser});
        if(current ===null) return;
        current.userCurrentSocketId =null;
        current.save(); 
        for(let el of current.userContacts){
            if(el === current.userId) return;
            console.log(el);
            console.log("HERE???");
            socket.to(el).emit("updateFriendsUponExit", msg=true);
        }
    })
}
module.exports = Exit;