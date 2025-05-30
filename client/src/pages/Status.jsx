import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Status = () => {
    const navigate = useNavigate();

    // Extracting user data from Redux store
    const { username, answers } = useSelector((state) => state.quiz);

    // State to control confetti animation
    const [showConfetti, setShowConfetti] = useState(true);

    // Hide confetti animation after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // If no username is found (quiz data missing), show a message with a "Go Home" button
    if (!username) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
                <h2 className="text-2xl font-semibold text-red-500">No Quiz Data Found</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="transition-all flex flex-col items-center w-[100vw] min-h-[100vh] bg-gray-100">
            
    
            <Navbar />

            {/* Confetti animation for celebration */}
            {showConfetti && <Confetti numberOfPieces={500} />}

            {/* Quiz Summary Card */}
            <div className="bg-white p-6 min-w-[50%] min-h-[50%] mt-5 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center text-green-600">Quiz Completed 🎉</h1>

               
                <div className="mt-6 text-center bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800">Your Performance</h2>

                    {/* Display Score */}
                    <div className="mt-4 flex justify-center">
                        <span className="px-6 py-3 text-3xl font-bold text-white bg-blue-600 rounded-full shadow-lg">
                            {answers.score}
                        </span>
                    </div>

                    {/* Display Quiz Details */}
                    <div className="mt-6 grid grid-cols-2 gap-4 text-lg text-gray-800">
                        <p className="font-medium">Quiz ID:</p>
                        <p className="text-gray-600">{answers.quiz_id}</p>

                        <p className="font-medium">Total Questions:</p>
                        <p className="text-gray-600">{answers.totalQuestions}</p>

                        <p className="font-medium text-violet-600">Attempted Questions:</p>
                        <p className="text-violet-600 font-semibold">{answers.attemptedQuestions}</p>

                        <p className="font-medium text-green-600">Correct Answers:</p>
                        <p className="text-green-600 font-semibold">{answers.correctAnswers}</p>

                        <p className="font-medium text-red-600">Wrong Answers:</p>
                        <p className="text-red-600 font-semibold">{answers.wrongAnswers}</p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/quiz")}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Status;
