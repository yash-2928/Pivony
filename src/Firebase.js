import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
 apiKey: "AIzaSyCA_jRmsJG4cg2OPXIqvNYo57mdzSBIxwo",
 authDomain: "pop-up-75cdc.firebaseapp.com",
 projectId: "pop-up-75cdc",
 storageBucket: "pop-up-75cdc.appspot.com",
 messagingSenderId: "324543989072",
 appId: "pop-up-75cdc"
};

const fb = firebase.initializeApp(firebaseConfig);

export const database = fb.firestore();
