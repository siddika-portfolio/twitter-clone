import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyAjkU1QpHctGbCaXznqVqdlB34htE1J2TE",
  authDomain: "twitter-clone-4519d.firebaseapp.com",
  projectId: "twitter-clone-4519d",
  storageBucket: "twitter-clone-4519d.appspot.com",
  messagingSenderId: "1089081264300",
  appId: "1:1089081264300:web:3191c9905c63ff13023709",
  measurementId: "G-WMCFW7YV8R"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default db;