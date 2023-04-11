let resetButton = document.querySelector('#reset');

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  onSnapshot,
  where
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth,  sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn6PYE_7HYD1pATm1S6DBDjsYMigiBQ00",
  authDomain: "pointage-1c893.firebaseapp.com",
  projectId: "pointage-1c893",
  storageBucket: "pointage-1c893.appspot.com",
  messagingSenderId: "551841692809",
  appId: "1:551841692809:web:026a70f6b5880338785a58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let connecteur = [];
const tabUser = (collection(db, "users"))

let seras = JSON.parse(localStorage.getItem("connected")) || [];

console.log(seras)
console.log(seras.length)

//AJOUT DANS LA BASE DE DONNÈE
var validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let addData = document.querySelector("#sign-up");
// console.log(addData);
if (addData) {
  addData.addEventListener("click", async function () {
    let prenom = document.querySelector("#prenom").value;
    let nom = document.querySelector("#nom").value;
    let numero = Number(document.querySelector("#numero").value);
    let statut = document.querySelector("#statut").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let confirmPW = document.querySelector("#confirmPW").value;

    //remplissage des inputs avant envoie dans la base de donnée
    if (
      prenom === "" ||
      nom === "" ||
      numero === "" ||
      statut === "" ||
      email === "" ||
      password === "" ||
      confirmPW === ""
    ) {
      alert("Veillez remplir tous les champs ");
      return;
    } else if (email.match(validRegex)) {
      if (password !== confirmPW) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log({userCredential});
           addDoc(collection(db, "users"), {
            email:email,
            prenom: prenom,
            nom: nom,
            numero: numero,
            statut: statut,
            isarchived:false
          }) .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Inscription réussie !',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              window.location.href = "../index.html";
            });
          })

      
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            title: 'Oups',
            text: "L'email existe déja",
            confirmButtonText: 'OK'
          });
          // ..
        });
      }
    } else {
      alert("L'adresse email doit contenir @!");
      return false;
    }
  });
}


let login = document.querySelector("#login");
if (login) {
  login.addEventListener('click', async (e) => {
  
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
  
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user = userCredential.user;
      const userSearch = user.email;
      
      const q = query(tabUser, where("email", "==", userSearch));
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((element) => {
       
        connecteur.push({ id: element.id});
      })
      console.log(connecteur);
      if (seras.length === 0) {
        localStorage.setItem("connected", JSON.stringify(connecteur))
        window.location.href="./dashbord/dashbord.html";
      } else{
        localStorage.clear()
        localStorage.setItem("connected", JSON.stringify(connecteur))
        window.location.href="./dashbord/dashbord.html";
      }     

    alert('Success');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Y'a Probléme");
    }
  });     
}

const user = [];

if (resetButton) {
  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    let email = document.querySelector("#changePw");
  
     sendPasswordResetEmail(auth, email.value)
     .then(() => {
      // window.location.href="./index.html"
      Swal.fire({
        icon: 'success',
        title: 'Un lien a été envoyé sur votre compte GMAIL',
        showConfirmButton: false,
        timer: 1500
      })
      // alert('Un lien a été envoyé sur votre compte GMAIL')
    })
       .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
           console.log('oups');
      });
      
  })
}




export default user;
