const users = require("./userSchema");
const messages = require("./messageSchema");
//
const MessageOneToOne = async(socket, io)=>{
    socket.on("sendMsg", async(msg)=>{
        const user = await users.findOne({userId:msg.userId});
        const current = await users.findOne({userId:socket.request.session.currentUser});
        if(user ===null) return;
        if(user.userCurrentSocketId ===null) return;
        const isMessage = await messages.findOne({
            $or:[
                {userId:user.userId, fromUserId:socket.request.session.currentUser},
                {userId:socket.request.session.currentUser, fromUserId:user.userId},
                
            ]
        });
        if(isMessage===null){
            const newMessage = new messages({
                userId:msg.userId,
                fromUserId:socket.request.session.currentUser,
                messages:[`${current.userId};${msg.msg}`]
            });
            newMessage.save();
        }
        if(isMessage !==null && (isMessage.fromUserId === socket.request.session.currentUser || isMessage.userId === socket.request.session.currentUser )){
            isMessage.messages.push(`${current.userName};${msg.msg}`);
            isMessage.save();
        }
        socket.to(user.userCurrentSocketId).emit("msgSent", msg=`${current.userName};${msg.msg}`);
    })
}
//
module.exports = MessageOneToOne;