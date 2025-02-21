import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CountdownTimer from "../components/CountDownTimer";
import { questions } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { setAnswers } from "../redux/quizSlice";
import { addQuizResult } from "../utils/indexedDB";



const Quiz = () => {
    const { username } = useSelector((state) => state.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [enteredValue, setEnteredValue] = useState("");
    const [answersArray, setAnswersArray] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [questionTimer, setQuestionTimer] = useState(120);



    useEffect(() => {
        setQuizData([...questions].sort(() => Math.random() - 0.5));
    }, []);



    const handleNext = () => {
        const currentQuestion = quizData[currentQuestionIndex];
        setQuestionTimer(30)

        if (currentQuestion.subject === "Multiple-Choice") {
            if (!selectedOption) return toast.error("Pick one option");
            const isCorrect = selectedOption == currentQuestion.answer;
            setAnswersArray((prev) => [...prev, { question: currentQuestion.question, selectedOption, isCorrect }]);
            setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
            setSelectedOption(null);
        } else {
            if (!enteredValue) return toast.error("Enter Your Answer");
            const isCorrect = enteredValue.toLowerCase().trim() == currentQuestion.answer.toLowerCase().trim();
            setAnswersArray((prev) => [...prev, { question: currentQuestion.question, enteredValue, isCorrect }]);
            setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
            setEnteredValue("");
        }

        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setIsComplete(true);
        }
    };



    const handleTimeUp = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            const currentQuestion = quizData[currentQuestionIndex];

            setAnswersArray((prev) => [
                ...prev,
                {
                    question: currentQuestion.question,
                    selectedOption: "Not-Answered",
                    isCorrect: false
                }
            ]);

            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setIsComplete(true);
        }
    };



    const handleSubmit = async () => {
        const quizResult = {
            quiz_id: uuidv4(),
            username,
            score,
            totalQuestions: quizData.length,
            correctAnswers: answersArray.filter((ans) => ans.isCorrect).length,
            wrongAnswers: answersArray.filter((ans) => !ans.isCorrect).length,
            attemptedQuestions: answersArray.length,
            answers: answersArray,
            date: new Date().toISOString()
        };
        await addQuizResult(quizResult)
        dispatch(setAnswers(quizResult));
        navigate("/finished")
        toast.success("Quiz Submitted Successfully!");
    };



    if (!username) {
        toast.error("Enter Username");
        navigate("/");
        return null;
    }



    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
            <Navbar />

            <div className="w-full px-10 flex items-center justify-between mt-1">
                <button
                    onClick={() => navigate("/")}
                    className="px-4 text-sm md:text-lg py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                    <span className="hidden md:block"> ⬅️</span> Back
                </button>

                <CountdownTimer isFinished={isComplete} questionTimer={questionTimer} setQuestionTimer={setQuestionTimer} handleSubmit={handleSubmit} onTimeUp={handleTimeUp} />
            </div>






            <div className="bg-white p-5 min-w-[50%] animate-slideUp min-h-[50%] mt-5 rounded-xl shadow-lg mb-5">
                {quizData.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between my-2">
                            <button className="bg-red-500 text-white px-4 py-1 rounded-full">
                                {quizData[currentQuestionIndex].subject}
                            </button>
                            <span className="px-6 py-1 bg-green-600 text-white font-bold rounded-full">
                                {currentQuestionIndex + 1} / {quizData.length}
                            </span>
                        </div>

                        <h1 className="my-4 font-semibold text-lg">
                            {currentQuestionIndex + 1}. {quizData[currentQuestionIndex].question}
                        </h1>

                        {quizData[currentQuestionIndex].subject === "Multiple-Choice" ? (
                            <div className="grid grid-cols-2 gap-3">
                                {quizData[currentQuestionIndex].options.map((option, i) => (
                                    <button
                                        disabled={isComplete}
                                        key={i}
                                        className={`animate-slideUp ${isComplete && "cursor-not-allowed"} border rounded-md p-2 transition-all ${selectedOption === option
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                            }`}
                                        onClick={() => setSelectedOption(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (


                            <div className="w-full flex items-center justify-end">
                                <input
                                    disabled={isComplete}
                                    type="number"
                                    value={enteredValue}
                                    onChange={(e) => setEnteredValue(e.target.value)}
                                    placeholder="Enter Your Answer"
                                    className="px-3 border w-[60%] h-10 rounded-lg"
                                />
                            </div>
                        )}



                        <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={!isComplete}
                                className={`${!isComplete ? "opacity-50 cursor-not-allowed" : "bg-violet-600 hover:bg-violet-700"
                                    } rounded-md text-white py-2 px-6 transition-all`}
                            >
                                Submit
                            </button>



                            {!isComplete && (
                                <button
                                    onClick={handleNext}
                                    className={`bg-blue-600 rounded-md cursor-pointer text-white py-2 px-6 transition-all ${(!selectedOption && quizData[currentQuestionIndex].subject === "Multiple-Choice") ||
                                        (!enteredValue && quizData[currentQuestionIndex].subject !== "Multiple-Choice")
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-700"
                                        }`}
                                    disabled={
                                        (!selectedOption && quizData[currentQuestionIndex].subject === "Multiple-Choice") ||
                                        (!enteredValue && quizData[currentQuestionIndex].subject !== "Multiple-Choice")
                                    }
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>


                ) : (

                    <p className="text-center text-lg font-semibold">Loading questions...</p>
                )}
            </div>
        </div>
    );
};

export default Quiz;
