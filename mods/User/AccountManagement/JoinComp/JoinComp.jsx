import LogInComp from "./LogInComp/LogInComp";
import SignUpComp from "./SignUpComp/SignUpComp";

const JoinComp = ()=>{
    return(
        <>
            <main className="flex gap-3 h-fit w-full items-center">
                <LogInComp/>
                <SignUpComp/>
            </main>
        </>
    )
}
export default JoinComp;