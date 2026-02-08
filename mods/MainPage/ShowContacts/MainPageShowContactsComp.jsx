import {useEffect, useState} from "react";
import url from "../../url/serverUrl";
import socket from "../../url/sockets";
//
const nestMainPageShowContactsComp = async(setItems)=>{
    try{
        const call = await fetch(`${url}mainPage/nestMainPageShowContacts`, {
            method:"GET",
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            setItems(resp.content);
            
        }
    }catch(err){
        console.error(err);
    }
}
const MainPageShowContactsComp = ()=>{
    const [items,setItems] = useState();
    const [itemState, setItemState] = useState(false);
    socket.on("msgSent", msg=>{
        console.log(msg);
    })
    useEffect(()=>{
        nestMainPageShowContactsComp(setItems);
    },[])
    return(
        <>
            <section className="basis-1/5 p-2">
               {items ===undefined?<></>:
                <div className="p-2 grid gap-3">
                    {items.usersInfo.map((index,key)=>(
                    <div className="flex gap-3">
                        <p className="basis-2/3">{index.slice(0, index.indexOf(";"))}</p>
                        <button onClick={()=>socket.emit("AddUser", index.slice(index.indexOf(";")+1, index.length))} className="basis-1/3 bg-black p-2 text-white ">Send</button>
                    </div>
                ))}
                </div>
               }
            </section>
        </>
    )
}
export default MainPageShowContactsComp;