import {useEffect, useState} from "react";
import url from "../../url/serverUrl";
import socket from "../../url/sockets";
import { useNavigate } from "react-router-dom";
//
const nestMainPageShowContactsComp = async(setItems)=>{
    try{
        const call = await fetch(`${url}friendsPage/nestFriendsInFriendsPage`, {
            method:"GET",
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            setItems(resp.content);
            resp.content.usersInfo.forEach(user=>{
                console.log(user);
            })
        }
    }catch(err){
        console.error(err);
    }
}
///
const DisplayFriendsComp = ()=>{
    const [items,setItems] = useState();
    //
    const nav = useNavigate();
    //
    useEffect(()=>{
        nestMainPageShowContactsComp(setItems);
    }, [])
    return(
        <>
            <section className="basis-1/4 p-2 grid gap-3 overflow-scroll overflow-x-hidden h-[100vh]" >
                <div>
                    {items ===undefined?<></>:
                <div className="p-2 border-2 border-black grid gap-3">
                    {items.usersInfo.map((index,key)=>(
                    <div className="flex gap-3">
                        <p className="basis-2/3">{index.slice(0, index.indexOf(";"))}</p>
                        <button onClick={()=>nav(`/chat/${index.slice(0, index.indexOf(";"))}`)} className="basis-1/3 bg-black p-2 text-white ">Chat</button>
                    </div>
                ))}
                </div>
               }
               
                </div>
            </section>
        </>
    )
}
export default DisplayFriendsComp;