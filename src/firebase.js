import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAc6H1kZXXdl1QhtR275rklkF4mHNhLyDo",
  authDomain: "styled-react-slack-clone.firebaseapp.com",
  projectId: "styled-react-slack-clone",
  storageBucket: "styled-react-slack-clone.appspot.com",
  messagingSenderId: "150266590670",
  appId: "1:150266590670:web:fd874a61e71c4cf71c679f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
