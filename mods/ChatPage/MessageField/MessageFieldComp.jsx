import { useParams } from "react-router-dom";
import url from "../../url/serverUrl";
import { useEffect, useState } from "react";
import socket from "../../url/sockets";
const loadMgs = async(contactId,setCurrentId, setMsgs)=>{
    try{
        const call = await fetch(`${url}chat/loadPreviousMsgs`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({contactId}),
            credentials:"include"
        });
        const resp = await call.json();
        if(resp.success){
            console.log(resp.content)
            if(resp.content ===null) return;
            setCurrentId(resp.content.currentId);
            setMsgs(resp.content.msgs);

        }
    }catch(err){
        console.error(err);
    }
}
const retreiveContactName = async(setId, userId)=>{
    try{
        const call = await fetch(`${url}chat/retreiveContactId`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId}),
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success) return setId(resp.content);
    }catch(err){
        console.error(err);
    }
}
/*const nestMessages = async(contactId)=>{
    try{
        const call = await fetch(`${url}chat/getMessages`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({contactId}),
            credentials:"include"
        });
        const resp = await call.json();
        if(resp.success){
            console.log(resp.content);
        }
    }catch(err){
        console.error(err);
    }
}*/
const MessageFieldPage = ()=>{
    const userId = useParams();
    
    //
    const [id, setId] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [message, setMessage] = useState("");
    const [bundle, setBundle] = useState({
        userId:id,
        msg:message,
    })
    //   
   
    //
    useEffect(()=>{
        
        retreiveContactName(setId,userId.contactId);
        loadMgs(userId.contactId,setCurrentId, setMsgs);
        socket.on("msgSent", msg=>{
            console.log(msg);
            setMsgs(prev=>({
                ...prev,
                messages:[...(prev.messages ?? []), `${currentId}:${message.replace(undefined, "")}`]
            }));
        }) 
    },[])
    //
    
    return(
        <>
            <section className="basis-3/4  ">
                <div className="p-2">
                    <p className="p-2 bg-black w-fit text-white">Chatting with {userId.contactId}</p>
                </div>
                <div className="gap-1 h-[80vh] overflow-scroll">
                    {msgs ===null?<></>:
                    msgs.messages?
                        msgs.messages.map((index,key)=>(
                            <div className={`${index.split(";")[0] === currentId? "bg-green-500":"bg-blue-500"}  rounded-2xl p-2 mt-2 mb-2 w-fit`}>{`${index.split(";")[0]}  ${index.split(";")[1]!==undefined?`: ${index.split(";")[1]}`:""}`}</div>
                        ))
                    :
                    <></>}
                </div>
                <div className="w-full flex items-center gap-2 bottom-0 p-1">
                    <input  value={message} onInput={(e)=>{setMessage(e.target.value);setBundle({userId:id,msg:e.target.value});}}   className="border-4 rounded-2xl p-2 basis-4/5 border-black outline-none"></input>
                    <button className="text-2xl text-white" onClick={()=>{if(message.length ===0)return; socket.emit("sendMsg", bundle);
                        console.log(message);
                        setMsgs(prev=>({
                            ...prev,
                            messages:[...(prev.messages ??[]), `${currentId}:${message}`]
                        }))
                    }}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                </div>
            </section>

        </>
    )
}
export default MessageFieldPage;