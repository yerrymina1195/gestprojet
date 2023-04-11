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

const links = document.querySelectorAll('.baba');
    
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
    });
  });
}

const sante  = document.querySelectorAll('.yerry');
    
if (sante.length) {
  sante.forEach((link) => {
    link.addEventListener('click', (e) => {
      sante.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
    });
  });
}
   
<<<<<<< HEAD
<<<<<<< HEAD
 


=======
>>>>>>> f33669e465e9ef03cc6342aabf48c4e2e1314b6f



  
<<<<<<< HEAD















=======
  
>>>>>>> 243686a8fffa6cd953f82672fb3b057a6adcf014
=======
>>>>>>> f33669e465e9ef03cc6342aabf48c4e2e1314b6f
