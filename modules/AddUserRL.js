const users = require("./userSchema");
//
const AddUserRL = (socket)=>{
    socket.on("AddUser",async(id)=>{
        if(id === socket.request.session.currentUser) return;
        const user = await users.findOne({userId:id});
        const current = await users.findOne({userId:socket.request.session.currentUser});
        if(user===null || current ===null) return;
        if(current.userContacts.length ===0){
            current.userContacts.push(id);
            return current.save();
        };
        for(let el of current.userContacts){
            if(el ===user.userId) return;
            current.userContacts.push(id);
            current.save();
        }
        socket.emit("addUserMainPageDeleteItem", true);
    })
}
//
module.exports = AddUserRL;