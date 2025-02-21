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
  },
});

export const { setUsername, setAnswers } = quizSlice.actions;
export default quizSlice.reducer;
