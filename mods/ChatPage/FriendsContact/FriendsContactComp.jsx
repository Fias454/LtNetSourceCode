import {useState, useEffect} from "react";
import url from "../../url/serverUrl";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../url/sockets";
const loadFriendsFriendsContactComp = async(setFriends)=>{
    try{
        const call = await fetch(`${url}chat/loadFriendsFriendsContactComp`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const resp = await call.json();
        if(resp.success){
            console.log(resp.content);
            setFriends(resp.content);
        }
    }catch(err){
        console.error(err);
    }
}
const FriendsContactComp = ()=>{
    const name = useParams();
    const [friends, setFriends]= useState();
    const [show, setShow] = useState(false);
    const nav = useNavigate();
    
    useEffect(()=>{
    socket.on("updateFriendsUponExit", (msg)=>{
        console.log("HERE??")
        loadFriendsFriendsContactComp(setFriends);
    })    
        loadFriendsFriendsContactComp(setFriends);
    }, [])
    return(
        <>
            <section className={`${show?"basis-0.5/5":"basis-1/5"} text-white transition-all p-2 items-start border-r-2 h-[100vh] `}>
                <div className="flex gap-2 items-center">
                    <button onClick={()=>show?setShow(false):setShow(true)} className="text-2xl"><i className={`${show?"rotate-180":"-rotate-0"} transition-all fa fa-arrow-left`} aria-hidden="true"></i></button>
                {!show?
                    <p>Online friends</p>:<></>}
                </div>
                {!show?
                <div className="h-[85vh] pt-2 w-full">
                    {!friends?<></>:
                        friends.map((index,key)=>(
                            index.name === name.contactId?
                                <></>:
                                <div onClick={(e)=>window.location.href = `/chat/${index.name}`} className=" p-2 flex items-center gap-3 hover:bg-gray-500 hover:text-black">
                                    <i  className={`${index.online ===null? "text-white":"text-green-500"} fa fa-circle `} aria-hidden="true"></i>
                                    <p className="text-white">{index.name}</p>

                                </div>
                            
                        ))}
                </div>
                :
                <></>}
            </section>
        </>
    )
}
export default FriendsContactComp;