
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Status from "./pages/Status";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Quiz from "./pages/Quiz";
import Finish from "./pages/Finish";
import History from "./pages/History";




const App = () => {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/status" element={<Status />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/finished" element={<Finish />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>

  );
};

export default App;
