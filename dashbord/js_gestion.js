 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
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


  const colRef = collection(db, "users");

// Create a query against the collection.
const q = query(colRef, where("statut", "==", "eleve"));
const pr = query(colRef, where("statut", "==", "professeur"));
const pl = query(colRef, where("statut", "==", "personnel"));

const elevesSnapshot = await getDocs(q);
const professorsSnapshot = await getDocs (pr);
const personelSnapshot = await getDocs(pl);

let students = []
let professors = []
let personel = []


elevesSnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  students.push({ ...doc.data(), id: doc.id })
  return students;
});

professorsSnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  professors.push({ ...doc.data(), id: doc.id })
  return professors;
});

personelSnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  personel.push({ ...doc.data(), id: doc.id })
  return personel;
});

// console.log(students);

var nb_eleves = students.length;
var nb_professors = professors.length;
var nb_personel = personel.length;

document.getElementById("nbr_eleves").innerHTML = nb_eleves;
document.getElementById("nbr_professeurs").innerHTML = nb_professors;
document.getElementById("nbr_personnel").innerHTML = nb_personel;
