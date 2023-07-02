// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6mUQoJCYFfF553gHeofnbc4zaM32O93M",
  authDomain: "epic-8b666.firebaseapp.com",
  projectId: "epic-8b666",
  storageBucket: "epic-8b666.appspot.com",
  messagingSenderId: "935788480278",
  appId: "1:935788480278:web:b19018017331d7b6587237",
};

// Initialize Firebase
const app = () => {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No firebase configuration object provided" +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    console.log("Firebase initialized");
  }
  return initializeApp(firebaseConfig);
};
export default app;
