import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPageComp from "./mods/MainPage/MainPageComp"
import JoinComp from "./mods/User/AccountManagement/JoinComp/JoinComp"
import MainProfilePage from "./mods/User/Profile/MainProfilePage";
import MainFriendsPage from "./mods/FriendsPage/MainFriendsPage";
import MainChatPage from "./mods/ChatPage/MainChatPage";
import SignUpComp from "./mods/User/AccountManagement/JoinComp/SignUpComp/SignUpComp";


function App() {
  return (
    <>
        <Router>
        <Routes>
          <Route path="/" element={<MainPageComp/>} />
          <Route path="/user/account/signUp" element={<SignUpComp/>} />
          <Route path="/user/profile" element={<MainProfilePage/>} />
          <Route path="/friendsPage" element={<MainFriendsPage/>} />
          <Route path="/chat/:contactId" element={<MainChatPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
