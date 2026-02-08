import {useState, useEffect} from "react";
import url from "../../url/serverUrl";
import socket from "../../url/sockets";


const nestPostsCompFunction = async(beginFrom,setBeginFrom, outBounds, setOutBounds,items,setItems)=>{
    try{
        const call = await fetch(`${url}mainPage/mainPagePostNestComp`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({beginFrom}),
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            if(items.length ===0){
                setItems(resp.content);
                setOutBounds(false);
            }else if(items.length>0){
                setItems(el=>[...el, ...resp.content]);
                setOutBounds(false);
            }
            setBeginFrom(beginFrom +10);
        }else{
            return setBeginFrom(beginFrom);
        }
    }catch(err){
        console.error(err);
    }
}
const PostsNestComp = ({outBounds, setOutBounds})=>{
    const [items, setItems] = useState([]);
    const [beginFrom, setBeginFrom] = useState(0);
    useEffect(()=>{
        nestPostsCompFunction(beginFrom,setBeginFrom, outBounds, setOutBounds,items,setItems);
 
    }, [])
    if(outBounds){
       nestPostsCompFunction(beginFrom,setBeginFrom, outBounds, setOutBounds,items,setItems);
    }

    return(
        <>
            <section className="basis-4/5">
                <div>
                    <p className="text-2xl font-bold">+Explore what others have posted:</p>
                </div>
                <div className="grid justify-center h-fit pb-10 overflow-scroll p-2 gap-3">
                    {!items?<></>:
                    items.map((index,key)=>(
                        <div className="p-2 w-[150%] border-b-2 border-gray-500">
                            <p>{index.postTitle}</p>
                            <div className="p-2">
                                <p>{index.postDescription}</p>
                            </div>
                            <div className=" w-full h-fit flex gap-2 p-2">
                                <button onClick={()=>socket.emit("Like", index.postTitle)} className={`"text-green-500"`}><i className="fa fa-thumbs-up"></i></button>
                                <p>{index.likes}</p>
                                <button><i className="fa fa-thumbs-down"></i></button>
                                <p>sadsa</p>

                            </div> 
                        </div>
                    ))
                }
                {outBounds?<div>Loading...</div>:<></>}
                </div>
            </section>
        </>
    )
}
export default PostsNestComp;