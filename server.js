const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
const port = 5000;
/////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/yourRep")
.then(()=>console.log("Mongodb connected")).catch((err)=>console.error(err));
/////////////////////////////////////////////////
const SignUp = require("./modules/SignUp");
const LogIn = require("./modules/LogIn");
const CheckHeaderProfileIcon = require("./modules/CheckHeaderProfileIcon");
const NestUserProfileUserInformationNest = require("./modules/NestUserProfileUserInformation");
const SubmitPost = require("./modules/SubmitPost");
const PostsNestComp = require("./modules/PostsNestComp");
const mainPagePostNestComp = require("./modules/mainPagePostNestComp");
const nestMainPageShowContacts = require("./modules/nestMainPageShowContacts");
const loadPreviousMsgs = require("./modules/loadPreviousMsgs");
const nestFriendsInFriendsPage = require("./modules/nestFriendsInFriendsPage");
const loadFriendsFriendsContactComp = require("./modules/loadFriendsFriendsContactComp");
const retreiveContactId = require("./modules/retreiveContactId");
const CheckMessages = require("./modules/CheckMessages");
const AddUserRL = require("./modules/AddUserRL");
const Init = require("./modules/Init");
const InteractWithPost = require("./modules/InteractWithPost");
const Exit = require("./modules/Exit");

const MessageOneToOne = require("./modules/MessageOneToOne");
/////////////////////////////////////////////////
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET", "POST"],
        credentials:true
    }
});
const sessionMid = session({
    secret:"Secret",
    resave:false,
    saveUninitialized:false
});
/////////////////////////////////////////////////
app.use(express.json());
app.use(sessionMid);
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET", "POST"],
    credentials:true
}))
io.use((socket, next)=>{
    sessionMid(socket.request, {}, next);
})
/////////////////////////////////////////////////
app.use("/user", SignUp);
app.use("/user", LogIn);
app.use("/user", CheckHeaderProfileIcon);
app.use("/user", NestUserProfileUserInformationNest);
app.use("/user", SubmitPost);
app.use("/user", PostsNestComp);
//---------------------//
app.use("/mainPage", mainPagePostNestComp);
app.use("/mainPage", nestMainPageShowContacts);
//--------------------//
app.use("/friendsPage", nestFriendsInFriendsPage);
//-------------------//
app.use("/chat", retreiveContactId);
app.use("/chat", loadPreviousMsgs);
app.use("/chat", loadFriendsFriendsContactComp);
app.use("/chat", CheckMessages);
/////////////////////////////////////////////////
io.on("connection", async(socket)=>{
    if(!socket.request.session.currentUser) return;
    Init(socket);
    Exit(socket);
    AddUserRL(socket);
    InteractWithPost(socket);
    MessageOneToOne(socket,io);
})
/////////////////////////////////////////////////
server.listen(port, ()=>{
    console.log(`Live at port: ${port}`);
})
