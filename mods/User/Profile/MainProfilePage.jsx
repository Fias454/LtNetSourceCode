import HeaderComp from "../../Header/HeaderComp";
import PostsNestComp from "./PostsNestComp/PostsNestComp";
import ShowInformation from "./ShowInformation/ShowInformation";
import SubmissionProfileComp from "./SubmissionProfileComp/SubmissionComp";

const MainProfilePage = ()=>{
    return(
        <>
            <main className="grid gap-3">
                <HeaderComp/>
                <section className="grid gap-10">
                    <ShowInformation/>
                    <SubmissionProfileComp/>
                    <PostsNestComp/>
                </section>
            </main>
        </>
    )
}
export default MainProfilePage;