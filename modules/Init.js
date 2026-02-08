const users = require("./userSchema");
//
const Init = async(socket)=>{
    const user = await users.findOne({userId:socket.request.session.currentUser});
    if(user ===null)return;
    user.userCurrentSocketId = socket.id;
    user.save();
    for(let el of user.userContacts){
        if(el===socket.request.session.currentUser) return
        console.log(el);
        socket.to(el).emit("updateFriendsUponExit", true);
    }
}
//
module.exports = Init;