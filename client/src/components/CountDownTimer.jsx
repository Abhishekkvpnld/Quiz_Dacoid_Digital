import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = ({ onTimeUp, handleSubmit, questionTimer, setQuestionTimer, isFinished }) => {
  const navigate = useNavigate();
  
  // State for total quiz timer (30 minutes)
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Effect for handling the overall quiz timer
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Automatically submit quiz when time runs out
      navigate("/finished"); // Redirect to finish page
      return;
    }

    // Countdown interval (decreases time by 1 second)
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft, navigate]);

  // Effect for handling per-question timer
  useEffect(() => {
    if (questionTimer === 0) {
      onTimeUp(); // Trigger when the time for the question is up
      setQuestionTimer(180); // Reset the timer for the next question
    }

    // Countdown interval (decreases time by 1 second)
    const questionInterval = setInterval(() => {
      setQuestionTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(questionInterval); // Cleanup on component unmount
  }, [questionTimer, onTimeUp]);

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex space-x-4">
      {/* Total quiz timer display */}
      <div className="text-center p-4">
        <h2 className="text-lg md:text-xl font-semibold rounded-full flex items-center justify-center text-white bg-blue-700 w-16 h-16">
          {formatTime(timeLeft)}
        </h2>
        <p className="text-white text-xs mt-2">Total Time</p>
      </div>


      {!isFinished && (
        <div className="text-center p-4">
          <h2 className="text-lg md:text-xl font-semibold rounded-full flex items-center justify-center text-white bg-red-600 w-16 h-16">
            {questionTimer}s
          </h2>
          <p className="text-white text-xs mt-2">Next Question</p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
