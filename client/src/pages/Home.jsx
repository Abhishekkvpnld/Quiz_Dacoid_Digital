import InstructionCard from "../components/InstructionCard ";
import StartBtn from "../components/StartBtn";
import { Instructions } from "../utils/constants";

const Home = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <StartBtn />
            <InstructionCard instructions={Instructions} />
        </div>
    )
}

export default Home;