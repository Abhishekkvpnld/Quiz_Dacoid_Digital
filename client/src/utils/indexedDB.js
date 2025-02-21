import { openDB } from "idb";

const DB_NAME = "QuizAppDB";
const STORE_NAME = "quizHistory";


const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};


export const addQuizResult = async (quizData) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(quizData);
  await tx.done;
};


export const getAllQuizResults = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

