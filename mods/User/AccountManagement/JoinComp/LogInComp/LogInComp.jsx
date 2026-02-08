import { useState } from "react";
import {useNavigate } from "react-router-dom";
import url from "../../../../url/serverUrl";
//
const logInFunction = async(userName, userPassword, nav)=>{
    try{
        if(userName.length <3 || userPassword.length <3) return;
        const call = await fetch(`${url}user/LogIn`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userName,userPassword}),
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success) nav("/");
    }catch(err){
        console.error(err);
    }
}
//
const LogInComp = ()=>{
    const [userName,setUserName] = useState("");
    const [userPassword, setUserPassword]= useState("");
    //
    const nav = useNavigate();
    return(
        <>
            <section className="basis-1/2 h-[100vh] items-center bg-black grid gap-0 text-white ">
                <div className="w-full grid gap-5">
                    <p className="font-bold text-4xl text-center text-purple-600">Log In</p>
                    <div className="grid w-[60%] ml-[20%] gap-2">
                        <input onChange={(e)=>setUserName(e.target.value)} value={userName} className=" border-2 border-purple-700 rounded-3xl  p-2 pl-3 pr-3 text-sm outline-none bg-black "/>
                        <input onChange={(e)=>setUserPassword(e.target.value)} value={userPassword} className="border-2 border-purple-700 rounded-3xl  p-2 pl-3 pr-3 text-sm outline-none bg-black"/>
                    <button onClick={()=>logInFunction(userName,userPassword, nav)} className="border-2 border-purple-700 rounded-3xl  p-2 pl-3 pr-3 w-[30%] ml-[35%] p-2 hover:border-white hover:bg-white hover:text-black transition-all">submit</button>
                    
                    </div>

                </div>
            </section>
        </>
    )
}
export default LogInComp;