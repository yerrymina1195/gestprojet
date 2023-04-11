import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getFirestore, 
  setDoc, 
  addDoc,
  getDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDBApmRQEvhUbztpygJBab7_vFAQLCjVWE",
    authDomain: "ajout-4f796.firebaseapp.com",
    projectId: "ajout-4f796",
    storageBucket: "ajout-4f796.appspot.com",
    messagingSenderId: "1013523243494",
    appId: "1:1013523243494:web:9f8ddbf4f5d19e6e5db627"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);







const usereleve = collection(db,'ajoutEleve');
 





const nom = "Mbaye";
const prenom = "Junior";

const querySnapshot = await getDocs(
  query(
    collection(db, "bulletin"),
    where("nom", "==", nom),
    where("prenom", "==", prenom)
  ) 
);

const tab = [];
 await getDocs(collection(db, "bulletin"));
querySnapshot.forEach((doc) => {
  tab.push({ ...doc.data() });
  console.log(doc.id, " => ", doc.data());
});


let table = document.getElementById('tBody');

let nomSpan = document.getElementById('nom');
let prenomSpan = document.getElementById('prenom');
let dateSpan = document.getElementById('date');
let firstElement = tab[0];

nomSpan.textContent = `Nom: ${firstElement.nom}`;
prenomSpan.textContent = `Prenom: ${firstElement.prenom}`;
dateSpan.textContent = `Date de naissance: ${firstElement.date}`
// console.log(tab);

tab.map(element => (
  table.innerHTML += `
          <tr>
                  <td>${element.maths.matiere}</td>
                  <td>${element.maths.devoir}</td>
                  <td>${element.maths.compo}</td>
                  <td>${element.maths.moyenne}</td>
                  <td>${element.maths.coef}</td>
                  <td>${element.maths.moyX}</td>
                  <td>${element.maths.rang}</td>
                  <td>${element.maths.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.anglais.matiere}</td>
                  <td>${element.anglais.devoir}</td>
                  <td>${element.anglais.compo}</td>
                  <td>${element.anglais.moyenne}</td>
                  <td>${element.anglais.coef}</td>
                  <td>${element.anglais.moyX}</td>
                  <td>${element.anglais.rang}</td>
                  <td>${element.anglais.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.hg.matiere}</td>
                  <td>${element.hg.devoir}</td>
                  <td>${element.hg.compo}</td>
                  <td>${element.hg.moyenne}</td>
                  <td>${element.hg.coef}</td>
                  <td>${element.hg.moyX}</td>
                  <td>${element.hg.rang}</td>
                  <td>${element.hg.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.svt.matiere}</td>
                  <td>${element.svt.devoir}</td>
                  <td>${element.svt.compo}</td>
                  <td>${element.svt.moyenne}</td>
                  <td>${element.svt.coef}</td>
                  <td>${element.svt.moyX}</td>
                  <td>${element.svt.rang}</td>
                  <td>${element.svt.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.pc.matiere}</td>
                  <td>${element.pc.devoir}</td>
                  <td>${element.pc.compo}</td>
                  <td>${element.pc.moyenne}</td>
                  <td>${element.pc.coef}</td>
                  <td>${element.pc.moyX}</td>
                  <td>${element.pc.rang}</td>
                  <td>${element.pc.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.eps.matiere}</td>
                  <td>${element.eps.devoir}</td>
                  <td>${element.eps.compo}</td>
                  <td>${element.eps.moyenne}</td>
                  <td>${element.eps.coef}</td>
                  <td>${element.eps.moyX}</td>
                  <td>${element.eps.rang}</td>
                  <td>${element.eps.appreciation}</td>
          </tr>
          <tr>
                  <td>${element.francais.matiere}</td>
                  <td>${element.francais.devoir}</td>
                  <td>${element.francais.compo}</td>
                  <td>${element.francais.moyenne}</td>
                  <td>${element.francais.coef}</td>
                  <td>${element.francais.moyX}</td>
                  <td>${element.francais.rang}</td>
                  <td>${element.francais.appreciation}</td>
          </tr>
          <tr>
    <td class="text-dark fw-bold">TOTAL</td>
    <td colspan="3"></td>                
    <td class="text-dark fw-bold">${element.total.coef}</td>
    <td class="text-dark fw-bold">${element.total.moyX}</td>
    <td colspan="2"></td>
</tr>
<tr>
    <td class="text-dark fw-bold">MOYENNE</td>
                <td class="text-dark fw-bold">${element.total.moy}</td> 
                <td class="text-dark fw-bold">Rang</td>
                <td class="text-dark fw-bold">5e</td>    
                <td>Absence</td>
                <td>0</td>
                <td>Retard</td>
                <td>0</td>
            </tr>
      `
))




// Calculer le total des coefficients et la moyenne totale
let totalCoefficients = 0;
let totalMoyenne = 0;
tab.forEach((element) => {
    totalCoefficients += parseInt(element.maths.coef) + parseInt(element.anglais.coef) + parseInt(element.hg.coef)
    + parseInt(element.svt.coef) + parseInt(element.pc.coef) + parseInt(element.eps.coef) + parseInt(element.francais.coef);
    totalMoyenne += (parseFloat(element.maths.moyenne) * parseInt(element.maths.coef)) 
    + (parseFloat(element.anglais.moyenne) * parseInt(element.anglais.coef))
    + (parseFloat(element.hg.moyenne) * parseInt(element.hg.coef))
    + (parseFloat(element.svt.moyenne) * parseInt(element.svt.coef))
    + (parseFloat(element.pc.moyenne) * parseInt(element.pc.coef))
    + (parseFloat(element.eps.moyenne) * parseInt(element.eps.coef))
    + (parseFloat(element.francais.moyenne) * parseInt(element.francais.coef));
});

let moyenneGenerale = totalMoyenne / totalCoefficients;

// Afficher le total des coefficients et la moyenne totale dans le tableau
// let tbody1 = document.getElementById('tBody');
// tbody1.innerHTML += `
// <tr>
//     <td class="text-dark fw-bold">TOTAL</td>
//     <td colspan="3"></td>                
//     <td class="text-dark fw-bold">${totalCoefficients}</td>
//     <td class="text-dark fw-bold">${totalMoyenne}</td>
//     <td colspan="2"></td>
// </tr>
// <tr>
//     <td class="text-dark fw-bold">MOYENNE</td>
//                 <td class="text-dark fw-bold">${moyenneGenerale.toFixed(2)}</td> 
//                 <td class="text-dark fw-bold">Rang</td>
//                 <td class="text-dark fw-bold">5e</td>    
//                 <td>Absence</td>
//                 <td>0</td>
//                 <td>Retard</td>
//                 <td>0</td>
//             </tr>
            
//         `;