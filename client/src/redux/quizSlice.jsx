import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    username: "",
    answers: {},
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    resetQuiz: (state) => {
      state.username = "";
      state.answers = {};
    },
  },
});

export const { setUsername, setAnswers,resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
