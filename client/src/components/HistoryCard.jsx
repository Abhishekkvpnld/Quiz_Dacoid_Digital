import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllQuizResults } from "../utils/indexedDB";

const HistoryCard = () => {

    const [quizHistory, setQuizHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getAllQuizResults();
            setQuizHistory(data);
        };

        fetchHistory();
    }, []);

    return (
        <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-700 p-6 sm:p-8 mt-10 rounded-2xl shadow-2xl w-full max-w-4xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="my-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">📜 Quiz History</h1>
                <p className="text-center text-gray-200 text-sm sm:text-base">
                    To pass the quiz, you need to score at least <span className="font-semibold">50%</span>.
                    Keep practicing and improve your performance! 🚀
                </p>
            </div>


            {history?.length === 0 ? (
                <p className="text-center text-lg">No quiz history available.</p>
            ) : (
                <motion.ul
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {quizHistory.map((quiz, index) => (
                        <motion.li
                            key={quiz.id}
                            className="p-5 sm:p-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-lg transition-all hover:scale-[1.03] border border-white/30"
                            whileHover={{ scale: 1.05 }}
                        >

                            <div className="flex flex-wrap items-center justify-between mb-4">
                                <p className="text-lg sm:text-xl font-semibold">Quiz {index + 1}</p>
                                <span
                                    className={`px-3 py-1 text-sm font-semibold rounded-full ${quiz?.score >= quiz.totalQuestions / 2
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                        }`}
                                >
                                    {quiz?.score >= quiz.totalQuestions / 2 ? "Passed" : "Failed"}
                                </span>
                            </div>


                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm sm:text-base">
                                <div className="flex border px-2 rounded-md justify-between items-center">
                                    <p className="text-gray-300">📌 Total:</p>
                                    <p className="font-semibold">{quiz?.totalQuestions}</p>
                                </div>
                                <div className="flex border px-2 rounded-md justify-between items-center">
                                    <p className="text-gray-300">✅ Attempted:</p>
                                    <p className="font-semibold">{quiz?.attemptedQuestions}</p>
                                </div>
                                <div className="flex border px-2 rounded-md justify-between items-center">
                                    <p className="text-gray-300">❌ Wrong:</p>
                                    <p className="font-semibold">{quiz?.wrongAnswers}</p>
                                </div>
                                <div className="flex border px-2 rounded-md justify-between items-center">
                                    <p className="text-gray-300">🎯 Correct:</p>
                                    <p className="font-semibold">{quiz?.correctAnswers}</p>
                                </div>
                                <div className="flex border px-2 rounded-md justify-between items-center col-span-2 sm:col-span-1">
                                    <p className="text-gray-300">🏆 Score:</p>
                                    <p className="font-semibold">{quiz?.score}</p>
                                </div>
                            </div>


                            <div className="flex flex-wrap items-center justify-between mt-5 text-xs text-gray-300">
                                <p>🆔 QID: {quiz?.quiz_id}</p>
                                <p>📅 {quiz?.date?.split("T")[0]}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </motion.div>
    );
};

export default HistoryCard;
