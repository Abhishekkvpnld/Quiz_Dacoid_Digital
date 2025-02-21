import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = ({ onTimeUp, handleSubmit, questionTimer, setQuestionTimer, isFinished }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30 * 60);


  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit()
      navigate("/finished");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);


  useEffect(() => {
    if (questionTimer === 0) {
      onTimeUp();
      setQuestionTimer(180);
    }
    const questionInterval = setInterval(() => {
      setQuestionTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(questionInterval);
  }, [questionTimer, onTimeUp]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <div className="flex space-x-4">
      <div className="text-center p-4">
        <h2 className="text-lg md:text-xl font-semibold rounded-full flex items-center justify-center text-white bg-blue-700 w-16 h-16">
          {formatTime(timeLeft)}
        </h2>
        <p className="text-white text-xs mt-2">Total Time</p>
      </div>

      {
        !isFinished && (
          <div className="text-center p-4">
            <h2 className="text-lg md:text-xl font-semibold rounded-full flex items-center justify-center text-white bg-red-600 w-16 h-16">
              {questionTimer}s
            </h2>
            <p className="text-white text-xs mt-2">Next Question</p>
          </div>
        )
      }
    </div>
  );
};

export default CountdownTimer;
