// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4__6_OqBEpVniMLLgrR9YzsoXqu4RSSA",
  authDomain: "authentic-app-c748b.firebaseapp.com",
  projectId: "authentic-app-c748b",
  storageBucket: "authentic-app-c748b.appspot.com",
  messagingSenderId: "936788752360",
  appId: "1:936788752360:web:f11516de5d6b74922cd65d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import user from "./inscription/inscription.js";

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const login = document.getElementById("login");

console.log(login);

login.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputEmail.value != "" && inputPassword.value != "") {
    e.preventDefault();
    const result = user.find(
      (el) =>
        el.email === inputEmail.value && el.password === inputPassword.value
    );
    window.location.href = "./dashbord/dashbord.html";
    alert("Connexion réussie.");
  } else {
    alert(
      "Il n'y a pas d'enregistrement d'utilisateur correspondant à cet identifiant. L'utilisateur a peut-être été supprimé."
    );
  }
});
