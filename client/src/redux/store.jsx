import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../redux/quizSlice";


export const store = configureStore({
    reducer: {
        quiz: quizReducer
    }
})