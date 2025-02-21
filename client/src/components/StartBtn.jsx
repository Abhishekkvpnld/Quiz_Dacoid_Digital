import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUsername } from '../redux/quizSlice';

const StartBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleStart = () => {
        if (!name.trim()) {
            return toast.error("Please enter your name");
        }

        dispatch(setUsername(name));
        navigate("/quiz");
    };

    return (
        <div className='flex items-center justify-center flex-col gap-6 my-10 px-6 sm:px-10'>

            <div className='mx-4 sm:mx-20 text-center'>
                <h1 className='font-semibold text-3xl text-blue-700 mb-3'>
                    QuizMate
                </h1>
                <p className='text-sm text-gray-500'>
                    Test your knowledge with our fun and interactive quiz! Choose the best answers and challenge your friends.
                </p>
            </div>

            <div className='flex flex-col gap-2 items-center justify-center w-[80%]'>
                <input 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    placeholder="Enter your name" 
                    className='border h-10 w-[50%] px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all'
                />
                <button
                    onClick={handleStart}
                    className='transition-all duration-300 ease-in-out transform bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:scale-105 hover:from-green-700 hover:to-green-900 focus:ring-2 focus:ring-green-500'
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default StartBtn;
