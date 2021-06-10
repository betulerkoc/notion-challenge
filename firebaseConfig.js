import * as firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDg4HBGPNfLWjNDKfVL_uek2fiXsNaFhQk",
    authDomain: "notion-challenge.firebaseapp.com",
    projectId: "notion-challenge",
    storageBucket: "notion-challenge.appspot.com",
    messagingSenderId: "977836419537",
    appId: "1:977836419537:web:e5a8088fe52cfef60598f0",
    measurementId: "G-RW8G98FYB6"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

export const auth = firebase.auth();