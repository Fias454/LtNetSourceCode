import {useEffect, useState} from "react";
import url from "../../../url/serverUrl";
//
const submitPostFunction = async(postTitle,postDescription, setPostTitle, setDescriptionTitle,img, setImg)=>{
    try{
        const post = new FormData();
        post.append("postTitle", postTitle);
        post.append("postDescription", postDescription);
        post.append("img", img);
        console.log(post)
        if(postTitle.length <= 3 || postDescription.length <=5) return;
        const call = await fetch(`${url}user/SubmitPost`, {
            method:"POST",
            body:post,
            credentials:"include"
        })
        const resp = await call.json();
        if(resp.success){
            setPostTitle("");
            setDescriptionTitle("");
            setImg();
        }
    }catch(err){
        console.error(err);
    }
}
const SubmissionProfileComp = ()=>{
    const [postTitle, setPostTitle] = useState("");
    const [img, setImg] = useState();
    const [postDescription, setPostDescription] = useState("");
    //

    return(
        <>
            <section className="w-1/2 p-2 h-fit">
                <div className="w-2/3 grid gap-1">
                    <input onChange={(e)=>setPostTitle(e.target.value)} value={postTitle} placeholder="Post title" className="w-full outline-none border-2 border-b-0 border-black p-2"></input>
                    <textarea onChange={(e)=>setPostDescription(e.target.value)} value={postDescription} placeholder="Post description" className="border-2 h-40 p-2 rounded-b-2xl  resize-none outline-none border-t-0 border-black"></textarea>
                    <div>
                        <label  for="img">Upload</label>
                        <input onClick={(e)=>setImg(e.target.value)} id="img" type="file" className="hidden"/>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={()=>submitPostFunction(postTitle, postDescription, setPostTitle,setPostDescription,img, setImg )} className="p-2 bg-black text-white w-1/3 hover:text-blue-800">Post</button>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SubmissionProfileComp;