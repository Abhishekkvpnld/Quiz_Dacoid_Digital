import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";

const QuizHistory = () => {

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600">
            <Navbar />
            <HistoryCard />
        </div>
    );
};

export default QuizHistory;
