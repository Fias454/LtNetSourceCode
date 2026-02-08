import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import url from "../url/serverUrl";
const CheckHeaderProfileIcon = async(setIcon)=>{
    try{
        const call = await fetch(`${url}user/CheckHeaderProfileIcon`, {
            method:"GET",
            credentials:"include"
        });
        const resp = await call.json();
        if(resp.success) return setIcon(true);
        if(!resp.success) return setIcon(false);
    }catch(err){
        console.error(err);
    }
}
const HeaderComp = ()=>{
    const [icon, setIcon] = useState(false);
    //
    const nav = useNavigate();
    //
    useEffect(()=>{
        CheckHeaderProfileIcon(setIcon);
    }, []);
    return(
        <>
            <header className="w-full h-20 p-2 bg-black flex gap-2 flex-nowrap text-white">
                <section className="basis-1/5 flex items-center justify-center">
                    <p className="text-bold text-3xl ">Logo</p>
                </section>
                <section className="basis-3/5 flex items-center gap-3 justify-center">
                    <button onClick={()=>nav("/")} className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Home</button>
                    <button className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Browse</button>
                    <button onClick={()=>nav("/friendsPage")} className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Friends</button>
                    <button className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Help</button>
                </section>
                <section className="basis-1/5 flex items-center gap-3 justify-end">
                    
                    {icon?<button onClick={()=>nav("/user/profile/")} className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Profile</button>:<button onClick={()=>nav("/user/account/join")} className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Account</button>}
                    <button className="hover:border-b-4 hover:border-t-4 hover:border-white  p-2 ">Settings</button>
                </section>

            </header>
        </>
    )
}
export default HeaderComp;