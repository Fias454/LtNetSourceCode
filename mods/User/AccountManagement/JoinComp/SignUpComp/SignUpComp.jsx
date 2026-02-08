import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../../../../url/serverUrl";

//
//
const signUpFunction = async(userName, userPassword, nav)=>{
    try{
        if(userName.length <3 || userPassword.length <3) return;
        const call = await fetch(`${url}user/SignUp`, {
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
const SignUpComp =()=>{
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    //
    const nav = useNavigate();
    return(
        <>
            <main className="w-screen h-screen items-center grid justify-items-center text-white bg-black">
                <section className="w-1/2 h-1/2 border-[1px] p-1 flex border-white"> 
                    <div className=" basis-1/5 flex items-center">
                        <p className="text-center font-bold w-full">Sign in</p>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <p>Name</p>
                            <input></input>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
export default SignUpComp;