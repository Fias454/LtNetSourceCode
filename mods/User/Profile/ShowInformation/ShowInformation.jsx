import { useEffect, useState } from "react";
import url from "../../../url/serverUrl";

const getUserInformation = async(setItem)=>{
    try{
        const call = await fetch(`${url}user/NestUserProfileUserInformation`,{
            method:"GET",
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            setItem(resp.content);
            console.log(resp.content);
        }
    }catch(err){
        console.error(err);
    }
}
const ShowInformation = ()=>{
    const [userInfo, setUserInfo] = useState([]);
    //
    useEffect(()=>{
        getUserInformation(setUserInfo);
    }, []);
    return(
        <>
            <section className="grid gap-3">
                <div>
                    <p className="text-center font-bold text-2xl">{userInfo.userName}</p>
                </div>
            </section>
        </>
    )
}
export default ShowInformation;