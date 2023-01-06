import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlqgPx9Qf83OrE4vTMyaVGUROELF67Dnk",
  authDomain: "todo-app---vue.firebaseapp.com",
  projectId: "todo-app---vue",
  storageBucket: "todo-app---vue.appspot.com",
  messagingSenderId: "872297511627",
  appId: "1:872297511627:web:2972681435dc0c077e794e",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
