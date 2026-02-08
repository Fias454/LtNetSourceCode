import {useState} from "react";
import HeaderComp from "../Header/HeaderComp"
import MainPageShowContactsComp from "./ShowContacts/MainPageShowContactsComp";
import ShowContactComp from "./ShowPosts/ShowContactsComp";

const MainPageComp = ()=>{
    const [outBounds, setOutBounds] = useState(false);
    return(
        <>
            <HeaderComp/>
            <main onScroll={(e)=>{
                    const elementScrollY = e.currentTarget.scrollTop;
                    const elementscroolHEight = e.currentTarget.scrollHeight-elementScrollY;
                    const elementHeight = e.currentTarget.clientHeight;
                    if(elementHeight+1>elementscroolHEight) return setOutBounds(true);
                    }}  className="w-full h-screen flex overflow-scroll">
                <ShowContactComp outBounds={outBounds} setOutBounds={setOutBounds}/>
                <MainPageShowContactsComp />
            </main>
        </>
    )
}
export default MainPageComp;