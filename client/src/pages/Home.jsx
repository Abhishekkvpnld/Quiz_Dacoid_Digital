

import Navbar from "../components/Navbar";
import StartBtn from "../components/StartBtn";
import { useNavigate } from "react-router-dom";



const Home = () => {

  const navigate = useNavigate()


  return (
    <div className="flex flex-col gap-4 ">
      <Navbar />
      <StartBtn />
    </div>
  )
}

export default Home;