import FriendsContactComp from "./FriendsContact/FriendsContactComp";
import MessageFieldPage from "./MessageField/MessageFieldComp";

const MainChatPage = ()=>{
    return(
        <>
            <main className="flex bg-slate-950 gap-3 flex-nowrap">
                <FriendsContactComp/>
                <MessageFieldPage/>
            </main>
        </>
    )
}
export default MainChatPage;
