// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db=getFirestore(app)
const querySnapshot = await getDocs(collection(db, "bulletin"));
let tabmoyenne=[]
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log( doc.data());
tabmoyenne.push(doc.data())
});
console.log(tabmoyenne);

let moyenne0to10 = tabmoyenne.filter(({ total: { moy } })=> moy >= 0 && moy <= 10)
console.log(moyenne0to10);
let moyenne10to15 = tabmoyenne.filter(({ total: { moy } }) => moy > 10 && moy <= 15);
console.log(moyenne10to15);
let moyenne15to20 = tabmoyenne.filter(({total: {moy}}) => moy > 15 && moy <= 20);
console.log(moyenne15to20);
const ctx = document.getElementById('myXhart');

new Chart(ctx, {
type: 'bar',
data: {
labels: ['Entre 0 et 10', 'Entre 10 et 15', 'Entre 15 et 20'],
datasets: [{

  data: [ moyenne0to10.length, moyenne10to15.length, moyenne15to20.length],
  borderWidth: 1,
  backgroundColor: '#56CCF2',
  borderRadus: [8],
}]
},
options: {
plugins: {
 legend:{
  display: false,  
 },
},

}
});


