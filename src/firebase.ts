
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRRqQGUcVDxqK2Qj4ZhWhbXBpxj9QsbLQ",
  authDomain: "weather-app-b1899.firebaseapp.com",
  projectId: "weather-app-b1899",
  storageBucket: "weather-app-b1899.appspot.com",
  messagingSenderId: "434091827678",
  appId: "1:434091827678:web:0b2edc813515b190853d4f",
  measurementId: "G-8J6DBV25KG"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider=new GoogleAuthProvider()

export {app,auth,provider};