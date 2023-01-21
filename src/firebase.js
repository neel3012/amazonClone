import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb5dYdMn8Sqyw0aLuSwQMTLa0OwVpn74g",
  authDomain: "challenge-44489.firebaseapp.com",
  projectId: "challenge-44489",
  storageBucket: "challenge-44489.appspot.com",
  messagingSenderId: "1017655361588",
  appId: "1:1017655361588:web:b7eba965c3e82e2416ca61",
  measurementId: "G-N8YLZHQC4J"
};

const firebaseapp=firebase.initializeApp(firebaseConfig);
const db=firebaseapp.firestore();
const auth=firebase.auth();


export {db,auth};