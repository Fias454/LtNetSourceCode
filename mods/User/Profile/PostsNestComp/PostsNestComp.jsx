import {useState, useEffect} from "react";
import url from "../../../url/serverUrl";


const nestPostsCompFunction = async(setItems)=>{
    try{
        const call = await fetch(`${url}user/PostsNestComp`,{
            method:"GET",
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            setItems(resp.content);
            console.log(resp.content);
        }
    }catch(err){
        console.error(err);
    }
}
const PostsNestComp = ()=>{
    const [items, setItems] = useState([]);
    useEffect(()=>{
        nestPostsCompFunction(setItems)
    }, [])
    return(
        <>
            <section>
                <div>
                    <p className="text-2xl font-bold">+What you posted:</p>
                </div>
                <div  className="grid p-2 gap-3">
                    {!items?<></>:
                    items.map((index,key)=>(
                        <div className="w-1/2 p-2 bg-slate-400 rounded-md ">
                            <p>{index.postTitle}</p>
                            <div className="p-2">
                                <p>{index.postDescription}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </section>
        </>
    )
}
export default PostsNestComp;