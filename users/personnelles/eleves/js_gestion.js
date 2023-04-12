 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBaGHpYRQ4-Sr7iPIE_tUE6iK3bqwl6gpk",
   authDomain: "gestion-scolaire-c0a4b.firebaseapp.com",
   projectId: "gestion-scolaire-c0a4b",
   storageBucket: "gestion-scolaire-c0a4b.appspot.com",
   messagingSenderId: "180035171455",
   appId: "1:180035171455:web:ef148b9947932ab8b33b4a"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

let navBar = document.querySelectorAll(".baba");
// console.log(navBar);
// alert('ok')
// navBar.forEach(function(a) {
//     a.addEventListener("click", function() {
//         // navBar.forEach(function(a){
//         //     a.classList.remove("active");
//         // })
//         a.classList.add("active");
//         console.log('a',a);
        
//     })
// })

// navBar.addEventListener("click", function(){
//   this.classList.add("active");
// })

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
   
  