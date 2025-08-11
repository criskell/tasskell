import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBX4qVy0Dtbur6vBoHVZYv7NwAFSrdywpo",
  authDomain: "tasskell.firebaseapp.com",
  databaseURL: "https://tasskell-default-rtdb.firebaseio.com",
  projectId: "tasskell",
  storageBucket: "tasskell.firebasestorage.app",
  messagingSenderId: "999222959551",
  appId: "1:999222959551:web:3a8dea8239c29a1554d50a",
  measurementId: "G-GYQ4VLXH96",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
