import firebase from "firebase/app"
import "firebase/database";
import "firebase/auth"
const app = firebase.initializeApp({
    apiKey: "AIzaSyDg4HBGPNfLWjNDKfVL_uek2fiXsNaFhQk",
    authDomain: "notion-challenge.firebaseapp.com",
    projectId: "notion-challenge",
    storageBucket: "notion-challenge.appspot.com",
    messagingSenderId: "977836419537",
    appId: "1:977836419537:web:e5a8088fe52cfef60598f0",
    measurementId: "G-RW8G98FYB6"
});
export const auth = app.auth()
export default app
