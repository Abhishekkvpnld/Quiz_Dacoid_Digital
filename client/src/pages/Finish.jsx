import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Confetti from "react-confetti";

const Finish = () => {
    const navigate = useNavigate();

    // State to control confetti animation
    const [showConfetti, setShowConfetti] = useState(true);
  
    // Hide confetti animation after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
            
            {/* Navbar Component */}
            <Navbar />

            {/* Confetti animation for celebration */}
            {showConfetti && <Confetti numberOfPieces={500} />}

            {/* Quiz Completion Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg mt-16 text-center w-[90%] max-w-md">
                <h1 className="text-3xl font-semibold text-blue-600 mb-6">
                    Congratulations! 🎉
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    You've completed the quiz. Well done!
                </p>

                {/* Button to navigate to the quiz status/results page */}
                <button
                    onClick={() => navigate(`/status`)}
                    className="px-6 py-3 mt-4 bg-blue-600 text-white font-semibold 
                    rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                    View Status
                </button>

                <p className="mt-4 text-gray-500">
                    You can now check your quiz results.
                </p>
            </div>
        </div>
    );
};

export default Finish;
